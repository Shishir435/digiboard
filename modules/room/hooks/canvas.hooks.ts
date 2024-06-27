import { useCallback, useEffect, useState } from "react"
import { socket } from "@/common/lib/socket"
import { useOptions } from "@/common/recoil/options"
import { drawOnUndo } from "../helpers/canvas.helpers"
import usersAtom, { useUsers } from "@/common/recoil/users"
import { useBoardPosition } from "./useBoardPosition"
import { getPos } from "@/common/lib/getPos"
import { useSetRecoilState } from "recoil"

let moves:[number,number][]=[]
let savedMoves:[number,number][][]=[]
export const useDraw=(
    blocked: boolean,
    handleEnd: ()=>void,
    ctx?:CanvasRenderingContext2D | undefined,

)=>{
    const [drawing,setDrawing]=useState(false)
    const option=useOptions()
    const users=useUsers()
    const boardPosition=useBoardPosition()
    const movedX=boardPosition.x
    const movedY=boardPosition.y
    useEffect(()=>{
        if(ctx){
            ctx.lineJoin="round"
            ctx.lineCap="round",
            ctx.lineWidth=option.lineWidth
            ctx.strokeStyle=option.lineColor
        }
    })

    const handleUndo=useCallback(()=>{
        if(ctx){
            savedMoves.pop()
            socket.emit("undo")
            drawOnUndo(ctx,savedMoves,users)
        }
    },[ctx,handleEnd,users])

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
        savedMoves.push(moves)
        socket.emit("draw",moves,option)
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

export const useSocketDraw=(ctx:CanvasRenderingContext2D,handleEnd:()=>void)=>{
    const setUsers=useSetRecoilState(usersAtom)
    useEffect(()=>{
        socket.on("user_draw",(newMoves,options,userId)=>{
            if(ctx){
                ctx.lineWidth=options.lineWidth
                ctx.strokeStyle=options.lineColor

                ctx.beginPath()
                newMoves.forEach(([x,y])=>{
                    ctx.lineTo(x,y)
                })
                ctx.stroke()
                ctx.closePath()
                handleEnd()
                setUsers((prevUsers)=>{
                    const newUsers={...prevUsers}
                    // @ts-ignore
                    newMoves[userId]=[...newUsers[userId],newMoves]
                    return newUsers
                })
            }
        })
        socket.on("user_undo",(userId)=>{
            setUsers((prevUsers)=>{
               const newUsers={...prevUsers}
               newUsers[userId]=newUsers[userId].slice(0,-1)
              if(ctx){
                drawOnUndo(ctx,savedMoves,newUsers)
                handleEnd()
              }
              return newUsers
            })
        })

        return()=>{
            socket.off("user_undo")
            socket.off("user_draw")
        }
    },[ctx,handleEnd,setUsers])
}