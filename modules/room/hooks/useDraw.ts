import { getPos } from "@/common/lib/getPos"
import { socket } from "@/common/lib/socket"
import { useOptionsValue, useSetSelection } from "@/common/recoil/options"
import { useEffect, useState } from "react"
import { drawCircle, drawLine, drawRectangle } from "../helpers/canvas.helpers"
import { useBoardPosition } from "./useBoardPosition"
import { useRefs } from './useRefs'
import { useSetSavedMoves } from "@/common/recoil/savedMoves"
import { useCtx } from "./useCtx"

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
    const {clearSavedMove}=useSetSavedMoves()
    const options=useOptionsValue()
    const boardPosition=useBoardPosition()
    const movedX=boardPosition.x
    const movedY=boardPosition.y
    const ctx=useCtx()
    const {setSelection}=useSetSelection()

    const setCtxOptions=()=>{
        if(ctx){
            ctx.lineJoin='round'
            ctx.lineCap='round'
            ctx.lineWidth=options.lineWidth
            ctx.strokeStyle=options.lineColor
            if(options.mode==='eraser'){
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
        if(options.shape==='line' && options.mode!=='select'){
            ctx.beginPath()
            ctx.lineTo(finalX,finalY)
            ctx.stroke()
        }
        tempMoves.push([finalX,finalY])
    }

    const handleEndDrawing=()=>{
        if(!ctx || blocked) return

        setDrawing(false)
        ctx.closePath()
        if(options.mode==='select'){
            drawAndSet()
            const x=tempMoves[0][0]
            const y=tempMoves[0][1]
            const width=tempMoves[tempMoves.length-1][0]-x
            const height=tempMoves[tempMoves.length-1][1]-y
            if(width !==0 && height!==0){
                setSelection({x,y,width,height})
            }
        }
        const move:Move={
            rectangle: {...tempSize},
            image: {base64: ""},
            circle: {...tempCircle},
            path: tempMoves,
            options,
            timestamps: 0,
            id: ""
        }
        tempMoves=[]
        tempCircle={cX: 0,cY: 0,radiusX: 0,radiusY: 0}
        tempSize={width: 0, height: 0}
        tempImageData=undefined
        if(options.mode!=='select'){
            socket.emit("draw",move)
            clearSavedMove()
        }
    }

    const handleDraw=(x:number,y:number,shift?:boolean)=>{
        if(!ctx || !drawing || blocked) return;
        const finalX=getPos(x,movedX)
        const finalY=getPos(y,movedY)
        drawAndSet()
        if(options.mode==='select'){
            ctx.fillStyle='rgba(0,0,0,0.2)'
            drawRectangle(ctx,tempMoves[0],finalX,finalY,false,true)
            ctx.fillStyle='rgba(0,0,0)'
            tempMoves.push([finalX,finalY])
            return
        }
        switch(options.shape){
            case "line":
                if(shift) tempMoves=tempMoves.slice(0,1)
                drawLine(ctx,tempMoves[0],finalX,finalY,shift)
                tempMoves.push([finalX,finalY])
                break;
            case "circle":
                tempCircle=drawCircle(ctx,tempMoves[0],finalX,finalY)
                break;
            case "rectangle":
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

