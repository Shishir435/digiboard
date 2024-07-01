import { getPos } from "@/common/lib/getPos"
import { socket } from "@/common/lib/socket"
import { useOptionsValue } from "@/common/recoil/options"
import { useMyMoves } from "@/common/recoil/rooms"
import { useCallback, useEffect, useState } from "react"
import { useBoardPosition } from "./useBoardPosition"

let tempMoves:[number,number][]=[]
export const useDraw=(
    ctx:CanvasRenderingContext2D | undefined,
    blocked: boolean,
)=>{
    const {handleAddMyMove,handleRemoveMyMove}=useMyMoves()
    const [drawing,setDrawing]=useState(false)
    const options=useOptionsValue()
    const boardPosition=useBoardPosition()
    const movedX=boardPosition.x
    const movedY=boardPosition.y
    useEffect(()=>{
        if(ctx){
            ctx.lineJoin="round"
            ctx.lineCap="round",
            ctx.lineWidth=options.lineWidth
            ctx.strokeStyle=options.lineColor
            if(options.erase){
                ctx.globalCompositeOperation='destination-out'
            }
        }
    })
    useEffect(()=>{
        socket.on("your_move",(move)=>{
            handleAddMyMove(move)
        })
        return ()=>{
            socket.off("your_move")
        }
    })

    const handleUndo=useCallback(()=>{
        if(ctx){
           handleRemoveMyMove()
            socket.emit("undo")
        }
    },[ctx,handleRemoveMyMove])

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
            options,
            timestamps: 0,
            eraser: options.erase
        }
        tempMoves=[]
        ctx.globalCompositeOperation='source-over'
        socket.emit("draw",move)
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

