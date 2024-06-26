import { useEffect, useState } from "react"
import { socket } from "@/common/lib/socket"

let moves:[number,number][]=[]
export const useDraw=(
    option: CtxOptions,
    ctx?:CanvasRenderingContext2D
)=>{
    const [drawing,setDrawing]=useState(false)

    useEffect(()=>{
        if(ctx){
            ctx.lineJoin="round"
            ctx.lineCap="round",
            ctx.lineWidth=option.lineWidth
            ctx.strokeStyle=option.lineColor
        }
    })

    const handleStartDrawing=(x:number,y:number)=>{
        if(!ctx) return
        moves=[[x,y]]
        setDrawing(true)
        ctx.beginPath()
        ctx.lineTo(x,y)
        ctx.stroke()
    }

    const handleEndDrawing=()=>{
        if(!ctx) return
        socket.emit("draw",moves,option)
        setDrawing(false)
        ctx.closePath()
    }

    const handleDraw=(x:number,y:number)=>{
        if(ctx && drawing){
            moves.push([x,y])
            ctx.lineTo(x,y)
            ctx.stroke()
        }
    }
    
    return {handleStartDrawing,handleEndDrawing,handleDraw,drawing}
}