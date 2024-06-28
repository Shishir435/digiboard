import { useCallback, useEffect, useState } from "react"
import { socket } from "@/common/lib/socket"
import { useOptions } from "@/common/recoil/options"
import { drawAllMoves, handleMove } from "../helpers/canvas.helpers"
import usersAtom, { useUsers } from "@/common/recoil/users"
import { useBoardPosition } from "./useBoardPosition"
import { getPos } from "@/common/lib/getPos"
import { useSetRecoilState } from "recoil"

let tempMoves:[number,number][]=[]
let movesWithoutUser:Move[]=[]
let savedMoves:Move[]=[]
export const useDraw=(
    blocked: boolean,
    handleEnd: ()=>void,
    ctx?:CanvasRenderingContext2D | undefined,

)=>{
    const [drawing,setDrawing]=useState(false)
    const options=useOptions()
    const users=useUsers()
    const boardPosition=useBoardPosition()
    const movedX=boardPosition.x
    const movedY=boardPosition.y
    useEffect(()=>{
        if(ctx){
            ctx.lineJoin="round"
            ctx.lineCap="round",
            ctx.lineWidth=options.lineWidth
            ctx.strokeStyle=options.lineColor
        }
    })

    const handleUndo=useCallback(()=>{
        if(ctx){
            savedMoves.pop()
            socket.emit("undo")
            drawAllMoves(ctx,savedMoves,movesWithoutUser,users)
        }
    },[ctx, users])

    useEffect(()=>{
        const handleUndoKeyBoard=(e:KeyboardEvent)=>{
            if(e.key==='z' && e.ctrlKey){
                handleUndo();
            }
        }
        document.addEventListener("keydown",handleUndoKeyBoard)
        return ()=>{
            document.removeEventListener("keydown",handleUndoKeyBoard)
        }
    },[handleUndo])
    const handleStartDrawing=(x:number,y:number)=>{
        if(!ctx || blocked) return
        setDrawing(true)
        ctx.beginPath()
        ctx.lineTo(getPos(x,movedX),getPos(y,movedY))
        ctx.stroke()

        tempMoves.push([getPos(x,movedX),getPos(y,movedY)])
    }

    const handleEndDrawing=()=>{
        if(!ctx || blocked) return
        setDrawing(false)
        ctx.closePath()
        const move:Move={
            path: tempMoves,
            options
        }
        savedMoves.push(move)
        socket.emit("draw",move)
        tempMoves=[]
        socket.emit("draw",move)
        drawAllMoves(ctx,savedMoves,movesWithoutUser,users)
        handleEnd()
    }

    const handleDraw=(x:number,y:number)=>{
        if(!ctx || !drawing || blocked){
            return
        }
        ctx.lineTo(getPos(x,movedX),getPos(y,movedY))
        ctx.stroke()
        tempMoves.push([getPos(x,movedX),getPos(y,movedY)])
    }
    
    return {
        handleStartDrawing,
        handleEndDrawing,
        handleDraw,
        drawing,
        handleUndo
    }
}

export const useSocketDraw=(ctx:CanvasRenderingContext2D,drawing:boolean,handleEnd:()=>void)=>{
    const setUsers=useSetRecoilState(usersAtom)

    useEffect(()=>{
        if(ctx) socket.emit("joined_room")
    },[ctx])

    useEffect(()=>{
        socket.on("room",(room,usersToParse)=>{
            if(!ctx) return;
            const users= new Map<string,Move[]>(JSON.parse(usersToParse))
            
            room.drawed.forEach((move)=>{
                handleMove(move,ctx)
                movesWithoutUser.push(move)
            })

            users.forEach((userMoves,userId)=>{
                userMoves.forEach((move)=>handleMove(move,ctx))
                setUsers((prevUsers)=>({...prevUsers,[userId]:userMoves}))
            })
            handleEnd()
        })
        return ()=>{
            socket.off("room")
        }
    },[ctx,handleEnd,setUsers])
    useEffect(()=>{
        let movesToDrawLater:Move|undefined
        let userIdLater=""

        socket.on("user_draw",(move,userId)=>{
            if(ctx && !drawing){
                handleMove(move,ctx)
                setUsers((prevUsers)=>{
                    const newUsers={...prevUsers}
                   if(newUsers[userId]) newUsers[userId]=[...newUsers[userId],move]
                    return newUsers
                })
            }else{
                movesToDrawLater=move
                userIdLater=userId
            }
        })
       

        return()=>{
            if(movesToDrawLater && userIdLater && ctx){
                handleMove(movesToDrawLater,ctx)
                handleEnd()
                setUsers((prevUsers)=>{
                    const newUsers={...prevUsers}
                    newUsers[userIdLater]=[...newUsers[userIdLater],movesToDrawLater as Move ]
                    return newUsers
                })
            }
            socket.off("user_draw")
        }
    },[ctx, drawing, handleEnd, setUsers])
    useEffect(()=>{
        socket.on("user_undo",(userId)=>{
            setUsers((prevUsers)=>{
               const newUsers={...prevUsers}
               newUsers[userId]=newUsers[userId]?.slice(0,-1)
              if(ctx){
                drawAllMoves(ctx,savedMoves,movesWithoutUser,newUsers)
                handleEnd()
              }
              return newUsers
            })
        })
        return ()=>{
            socket.off("user_undo")
        }
    },[ctx,handleEnd,setUsers])
}