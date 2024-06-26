import { useDraw } from "@/common/hooks/drawing";
import { socket } from "@/common/lib/socket";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const canvasRef=useRef<HTMLCanvasElement>(null)
  const ctxRef=useRef<CanvasRenderingContext2D>()

  const [size,setSize]=useState({width: 0,height:0}) //canvas size
  const [options,setOptions]=useState<CtxOptions>({lineColor:"#000",lineWidth: 5}) //strock-property

  const {handleDraw,handleEndDrawing,handleStartDrawing,drawing}=useDraw(options,ctxRef.current)

  // dynammically update the width and height of the window
  useEffect(()=>{
    const handleResize=()=>{
      setSize({height:window.innerHeight, width:window.innerWidth})
    }
    window.addEventListener("resize",handleResize)
    handleResize()
    return ()=>{
      window.removeEventListener("resize",handleResize)
    }
  })

  // assign the context ref based on the canvas ref
  useEffect(()=>{
    const canvas=canvasRef.current
    if(canvas){
      const ctx=canvas.getContext("2d")
      if(ctx) ctxRef.current=ctx
    }
  },[options.lineColor,options.lineWidth])

  const drawFromSocket=(
    socketMoves:[number,number][],
    socketOptions: CtxOptions
  )=>{
    const tempCtx=ctxRef.current
    if(tempCtx){
      tempCtx.lineWidth=socketOptions.lineWidth
      tempCtx.strokeStyle=socketOptions.lineColor

      tempCtx.beginPath()
      socketMoves.forEach(([x,y])=>{
        tempCtx.lineTo(x,y)
        tempCtx.stroke()
      })
      tempCtx.closePath()
    }
  }
  // listen other events (server events)
  useEffect(()=>{
    let movesToDrawLater:[number,number][]=[]
    let optionsToUseLater:CtxOptions={
      lineColor: "",
      lineWidth: 0
    }

    socket.on("socket_draw",(movesToDraw,socketOptions)=>{
      if(ctxRef.current && !drawing){
        drawFromSocket(movesToDraw,socketOptions)
      }else{
        movesToDrawLater=movesToDraw
        optionsToUseLater=socketOptions
      }
    })

    return ()=>{
      socket.off("socket_draw")
      if(movesToDrawLater.length){
        drawFromSocket(movesToDrawLater,optionsToUseLater)
      }
    }
  },[drawing])
  return (
    <div className="flex h-full w-full justify-center items-center">
       <button onClick={()=>setOptions({lineColor:'red',lineWidth: 6})} className="absolute bg-black text-red-500" >he</button>
       <canvas className="h-full w-full" ref={canvasRef} 
       onMouseDown={(e)=>handleStartDrawing(e.clientX,e.clientY)} 
       onMouseUp={handleEndDrawing} 
       onMouseMove={(e)=>handleDraw(e.clientX,e.clientY)} 
       onTouchStart={(e)=>handleStartDrawing(e.touches[0].clientX,e.touches[0].clientY)}
       onTouchEnd={handleEndDrawing}
       onTouchMove={(e)=>handleDraw(e.touches[0].clientX,e.touches[0].clientY)} 
       width={size.width}
       height={size.height} />
       
    </div>
  );
}
