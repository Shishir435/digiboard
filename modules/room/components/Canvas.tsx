import { CANVAS_SIZE } from '@/common/constants/canvasSize'
import { useViewPortSize } from '@/common/hooks/useViewPortSize'
import { useMotionValue,motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import {useKeyPressEvent} from "react-use"
import { useDraw, useSocketDraw } from '../hooks/canvas.hooks'
import MiniMap from './Minimap'
import { useBoardPosition } from '../hooks/useBoardPosition'
const Canvas = () => {
  const canvasRef=useRef<HTMLCanvasElement>(null)
  const smallCanvasRef=useRef<HTMLCanvasElement>(null)
  const [dragging,setDragging]=useState(false)
  const [ctx,setCtx]=useState<CanvasRenderingContext2D>()
  const [,setMovedMiniMap]=useState(false)
  const {width,height}=useViewPortSize()

 

  // const x=useMotionValue(0)
  // const y=useMotionValue(0)
  const {x,y}=useBoardPosition()

  const copyCanvasToSmall=()=>{
    if(canvasRef.current && smallCanvasRef.current){
      const smallCtx=smallCanvasRef.current.getContext("2d")
      if(smallCtx){
        smallCtx.clearRect(0,0,CANVAS_SIZE.width,CANVAS_SIZE.height)
        smallCtx.drawImage(canvasRef.current,0,0,CANVAS_SIZE.width,CANVAS_SIZE.height)
      }
    }
  } 
  useEffect(()=>{
    const newCtx=canvasRef.current?.getContext("2d")
    if(newCtx) setCtx(newCtx)
    const handleKeyUp=(e:KeyboardEvent)=>{
      if(!e.ctrlKey && dragging){
        setDragging(false)
      }
  }
  window.addEventListener("keyup",handleKeyUp)
  return ()=>{
    window.removeEventListener("keyup",handleKeyUp)
  }
  }, [dragging,ctx])

  const {
    handleDraw,
    handleEndDrawing,
    handleStartDrawing,
    handleUndo,
    drawing
  }=useDraw(dragging,copyCanvasToSmall,ctx)
  useKeyPressEvent('Control',(e)=>{
    if(e.ctrlKey && !dragging){
      setDragging(true)
    }
  })
  useSocketDraw(ctx!,drawing,copyCanvasToSmall)
  return (
    <div className="relative h-full w-full overflow-hidden ">
      <button className="absolute top-0 " onClick={handleUndo}>undo</button>
      <motion.canvas 
      ref={canvasRef}
      width={CANVAS_SIZE.width}
      height={CANVAS_SIZE.height}
      className={`bg-zinc-300 ${dragging && "cursor-move"}`}
      style={{x,y}}

      drag={dragging}
      dragConstraints={{
        left: -(CANVAS_SIZE.width -width),
        right: 0,
        top: -(CANVAS_SIZE.height-height),
        bottom: 0,
      }}
      dragElastic={0}
      dragTransition={{power:0,timeConstant: 0}}
      onMouseDown={(e)=>handleStartDrawing(e.clientX,e.clientY)} 
      onMouseUp={handleEndDrawing} 
      onMouseMove={(e)=>handleDraw(e.clientX,e.clientY)} 
      onTouchStart={(e)=>handleStartDrawing(e.touches[0].clientX,e.touches[0].clientY)}
      onTouchEnd={handleEndDrawing}
      onTouchMove={(e)=>handleDraw(e.touches[0].clientX,e.touches[0].clientY)} 
      />
    <MiniMap ref={smallCanvasRef} dragging={dragging} setMovedMiniMap={setMovedMiniMap} />
  </div>
  )
}

export default Canvas