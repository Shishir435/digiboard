import { getPos } from "@/common/lib/getPos"
import { socket } from "@/common/lib/socket"
import { useOptionsValue } from "@/common/recoil/options"
import { useMyMoves, useRoom } from "@/common/recoil/rooms"
import { useCallback, useEffect, useState } from "react"
import { useBoardPosition } from "./useBoardPosition"
import { drawAllMoves, drawCircle, drawLine, drawRectangle } from "../helpers/canvas.helpers"

let tempMoves:[number,number][]=[]
const setCtxOptions=(ctx:CanvasRenderingContext2D,options:CtxOptions)=>{
    ctx.lineJoin='round'
    ctx.lineCap='round'
    ctx.lineWidth=options.lineWidth
    ctx.strokeStyle=options.lineColor
    if(options.erase){
        ctx.globalCompositeOperation='destination-out'
    }
}

let tempRadius=0
let tempSize={
    width: 0,
    height: 0
}

export const useDraw=(
    ctx:CanvasRenderingContext2D | undefined,
    blocked: boolean,
)=>{
    const room=useRoom()
    const {handleAddMyMove,handleRemoveMyMove}=useMyMoves()
    const [drawing,setDrawing]=useState(false)
    const options=useOptionsValue()
    const boardPosition=useBoardPosition()
    const movedX=boardPosition.x
    const movedY=boardPosition.y
    useEffect(()=>{
        if(ctx){
            setCtxOptions(ctx,options)
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
        const finalX=getPos(x,movedX)
        const finalY=getPos(y,movedY)
        setDrawing(true)
        ctx.beginPath()
        ctx.lineTo(finalX,finalY)
        ctx.stroke()
        tempMoves.push([finalX,finalY])
    }

    const handleEndDrawing=()=>{
        if(!ctx || blocked) return

        setDrawing(false)
        ctx.closePath()
        if(options.shape!=='circle') tempRadius=0
        if(options.shape!=='rectangle') tempSize={width:0,height:0}

        const move:Move={
            ...tempSize,
            shape: options.shape,
            radius:tempRadius,
            path: tempMoves,
            options,
            timestamps: 0,
            eraser: options.erase
        }
        tempMoves=[]
        ctx.globalCompositeOperation='source-over'
        socket.emit("draw",move)
    }

    const handleDraw=(x:number,y:number,shift?:boolean)=>{
        if(!ctx || !drawing || blocked) return;
        const finalX=getPos(x,movedX)
        const finalY=getPos(y,movedY)
        
        switch(options.shape){
            case "line":
                if(shift){
                    tempMoves=tempMoves.slice(0,1)
                    drawAllMoves(ctx,room,options)
                }
                drawLine(ctx,tempMoves[0],finalX,finalY,shift)
                tempMoves.push([finalX,finalY])
                break;
            case "circle":
                drawAllMoves(ctx,room,options)
                tempRadius=drawCircle(ctx,tempMoves[0],finalX,finalY)
                break;
            case "rectangle":
                drawAllMoves(ctx,room,options)
                tempSize=drawRectangle(ctx,tempMoves[0],finalX,finalY,shift)
                break;
            default:
                break;
        }
    }
    
    return {
        handleStartDrawing,
        handleEndDrawing,
        handleDraw,
        drawing,
        handleUndo
    }
}

