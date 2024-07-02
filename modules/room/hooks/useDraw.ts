import { getPos } from "@/common/lib/getPos"
import { socket } from "@/common/lib/socket"
import { useOptionsValue } from "@/common/recoil/options"
import { useEffect, useState } from "react"
import { drawCircle, drawLine, drawRectangle } from "../helpers/canvas.helpers"
import { useBoardPosition } from "./useBoardPosition"
import { useRefs } from './useRefs'
import { useSetSavedMoves } from "@/common/recoil/savedMoves"

let tempMoves:[number,number][]=[]


let tempCircle={
    cX: 0,
    cY: 0,
    radiusX: 0,
    radiusY: 0,
}
let tempSize={
    width: 0,
    height: 0
}
let tempImageData:ImageData | undefined

export const useDraw=(
    blocked: boolean
)=>{
    const {canvasRef}=useRefs()
    const [drawing,setDrawing]=useState(false)
    const [ctx,setCtx]=useState<CanvasRenderingContext2D>()
    const options=useOptionsValue()
    const boardPosition=useBoardPosition()
    const {clearSavedMove}=useSetSavedMoves()
    const movedX=boardPosition.x
    const movedY=boardPosition.y
    useEffect(()=>{
        const newCtx=canvasRef.current?.getContext('2d')
        if(newCtx){
            setCtx(newCtx)
        }
    },[canvasRef])

    const setCtxOptions=()=>{
        if(ctx){
            ctx.lineJoin='round'
            ctx.lineCap='round'
            ctx.lineWidth=options.lineWidth
            ctx.strokeStyle=options.lineColor
            if(options.erase){
                ctx.globalCompositeOperation='destination-out'
            }else{
                ctx.globalCompositeOperation='source-over'
            }
        }
    }

    const drawAndSet=()=>{
        if(!tempImageData){
            tempImageData=ctx?.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
        }
        if(tempImageData){
            ctx?.putImageData(tempImageData,0,0)
        }
    }
   
    const handleStartDrawing=(x:number,y:number)=>{
        if(!ctx || blocked) return
        const finalX=getPos(x,movedX)
        const finalY=getPos(y,movedY)
        setDrawing(true)
        setCtxOptions()
        ctx.beginPath()
        ctx.lineTo(finalX,finalY)
        ctx.stroke()
        tempMoves.push([finalX,finalY])
    }

    const handleEndDrawing=()=>{
        if(!ctx || blocked) return

        setDrawing(false)
        ctx.closePath()
        const move:Move={
            rectangle: {...tempSize},
            image: {base64: ""},
            circle: {...tempCircle},
            path: tempMoves,
            options,
            timestamps: 0,
            eraser: options.erase,
            id: ""
        }
        tempMoves=[]
        tempCircle={cX: 0,cY: 0,radiusX: 0,radiusY: 0}
        tempSize={width: 0, height: 0}
        tempImageData=undefined
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
                    drawAndSet()
                }
                drawLine(ctx,tempMoves[0],finalX,finalY,shift)
                tempMoves.push([finalX,finalY])
                break;
            case "circle":
                drawAndSet()
                tempCircle=drawCircle(ctx,tempMoves[0],finalX,finalY)
                break;
            case "rectangle":
                drawAndSet()
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
        drawing
    }
}

