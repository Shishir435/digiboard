import { useCallback, useEffect, useState } from "react"
import { socket } from "@/common/lib/socket"
import { useOptions } from "@/common/recoil/options"
import { drawOnUndo, handleMove } from "../helpers/canvas.helpers"
import usersAtom, { useUsers } from "@/common/recoil/users"
import { useBoardPosition } from "./useBoardPosition"
import { getPos } from "@/common/lib/getPos"
import { useSetRecoilState } from "recoil"

let moves:[number,number][]=[]
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
            drawOnUndo(ctx,savedMoves,users)
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
    }

    const handleEndDrawing=()=>{
        if(!ctx || blocked) return
        setDrawing(false)
        ctx.closePath()
        const move:Move={
            path: moves,
            options
        }
        savedMoves.push(move)
        socket.emit("draw",move)
        moves=[]
        handleEnd()
    }

    const handleDraw=(x:number,y:number)=>{
        if(!ctx || !drawing || blocked){
            return
        }
        ctx.lineTo(getPos(x,movedX),getPos(y,movedY))
        ctx.stroke()
        moves.push([getPos(x,movedX),getPos(y,movedY)])
    }
    
    return {handleStartDrawing,handleEndDrawing,handleDraw,drawing,handleUndo}
}

export const useSocketDraw=(ctx:CanvasRenderingContext2D,drawing:boolean,handleEnd:()=>void)=>{
    const setUsers=useSetRecoilState(usersAtom)

    useEffect(()=>{
        socket.emit("joined_room")
    },[])

    useEffect(()=>{
        socket.on("room",(roomJSON)=>{
            const room:Room= new Map(JSON.parse(roomJSON))
            room.forEach((userMoves,userId)=>{
                if(ctx){
                    userMoves.forEach((move)=>handleMove(move,ctx))
                    handleEnd()
                    setUsers((prevUsers)=>({...prevUsers,[userId]:userMoves}))
                }
            })
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
                drawOnUndo(ctx,savedMoves,newUsers)
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