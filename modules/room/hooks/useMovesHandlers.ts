import { getStringFromRgba } from './../../../common/lib/rgba';
import { socket } from "@/common/lib/socket"
import { useMyMoves, useRoom } from "@/common/recoil/rooms"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useRefs } from "./useRefs"
import { useSetSavedMoves } from "@/common/recoil/savedMoves"
import { useCtx } from "./useCtx"
import { useSelection } from "./useSelection"
let prevMovesLength=0
export const useMovesHandlers = (clearOnYourMove :()=>void) => {
    const { canvasRef, miniMapRef } = useRefs()
    const room = useRoom()
    const {removeSavedMove,addSavedMove}=useSetSavedMoves()
    const { handleAddMyMove, handleRemoveMyMove } = useMyMoves()
    const ctx=useCtx()

    const sortedMoves = useMemo(() => {
        const { movesWithoutUser, myMoves, usersMoves } = room
        const moves = [...movesWithoutUser, ...myMoves]
        usersMoves.forEach((userMove) => moves.push(...userMove))
        moves.sort((a, b) => a.timestamps - b.timestamps)
        return moves
    }, [room])

    const copyCanvasToSmall = useCallback(() => {
        if (canvasRef.current && miniMapRef.current) {
            const smallCtx = miniMapRef.current.getContext("2d")
            if (smallCtx) {
                smallCtx.clearRect(0, 0, smallCtx.canvas.width, smallCtx.canvas.height)
                smallCtx.drawImage(canvasRef.current, 0, 0, smallCtx.canvas.width, smallCtx.canvas.height)
            }
        }
    },[canvasRef,miniMapRef])

    const drawMove = useCallback((move: Move,image?:HTMLImageElement) => {
     
            const { path } = move
            if (!ctx && !path.length) {
                return
            }
            const moveOptions = move.options

            if (moveOptions.shape === 'image' && image) {
                ctx?.drawImage(image,path[0][0],path[0][1])
            }
            if (!ctx) {
                return
            }
            ctx.lineWidth = moveOptions.lineWidth
            ctx.strokeStyle = getStringFromRgba(moveOptions.lineColor)
            ctx.fillStyle = getStringFromRgba(moveOptions.fillColor)
            if (move.options.mode==='eraser') ctx.globalCompositeOperation = 'destination-out'
            else ctx.globalCompositeOperation='source-over'
            switch (moveOptions.shape) {
                case "line":
                    ctx.beginPath()
                    path.forEach(([x, y]) => {
                        ctx.lineTo(x, y)
                    })
                    ctx.stroke()
                    ctx.closePath()
                    break;
                case "circle":
                    const {cX,cY,radiusX,radiusY}=move.circle
                    ctx.beginPath()
                    ctx.ellipse(cX,cY,radiusX,radiusY,0, 0, 2 * Math.PI);
                    ctx.stroke()
                    ctx.fill()
                    ctx.closePath()
                    break;
                case "rectangle":
                    const {height,width}=move.rectangle
                    ctx.beginPath()
                    ctx.rect(path[0][0], path[0][1],width,height)
                    ctx.stroke()
                    ctx.fill()
                    ctx.closePath()
                    break;
                default:
                    break;
            }
            copyCanvasToSmall()
        
    },[copyCanvasToSmall,ctx])
    
    const drawAllMoves=useCallback(async()=>{
        if(!ctx) return;
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
        const images= await Promise.all(sortedMoves.filter((move)=>move.options.shape==='circle').map((move)=>{
            return new Promise<HTMLImageElement>((resolve)=>{
                const img= new Image()
                img.src=move.image.base64
                img.id=move.id
                img.addEventListener('load',()=>{
                    return resolve(img)
                })

            })
        }))
        sortedMoves.forEach((move)=>{
            if(move.options.shape==='image'){
                const img=images.find((image)=>image.id===move.id)
                if(img) drawMove(move,img)
                else drawMove(move)
            }
        })
        copyCanvasToSmall()
    },[ctx,drawMove,sortedMoves,copyCanvasToSmall])
    useSelection(drawAllMoves)
    useEffect(()=>{
        socket.on('your_move',(move)=>{
            clearOnYourMove()
            handleAddMyMove(move)
        })
        return ()=>{
            socket.off('your_move')
        }
    },[handleAddMyMove,clearOnYourMove])
    useEffect(()=>{
        if(prevMovesLength >=sortedMoves.length || !prevMovesLength){
            drawAllMoves()
        }else{
            const lastMove=sortedMoves[sortedMoves.length-1]
            if(lastMove.options.shape==='image'){
                const img= new Image()
                img.src=lastMove.image.base64
                img.id=lastMove.id
                img.addEventListener('load',()=>drawMove(lastMove,img))
            }else{
                drawMove(lastMove)
            }
        }
        return ()=>{
            prevMovesLength=sortedMoves.length
        }
    },[sortedMoves,drawAllMoves,drawMove])
    
    const handleUndo=useCallback(()=>{
        if(ctx){
           const move= handleRemoveMyMove()
           if(move){
            addSavedMove(move)
           }
            socket.emit("undo")
        }
    },[addSavedMove, ctx, handleRemoveMyMove])
    const handleRedo=useCallback(()=>{
        if(ctx){
            const move=removeSavedMove()
            if(move){
                socket.emit("draw",move)
            }
        }
    },[ctx,removeSavedMove])
    useEffect(()=>{
        const handleUndoRedoKeyboard=(e:KeyboardEvent)=>{
            if(e.ctrlKey && e.key==='z'){
                handleUndo()
            }else if(e.key==='y' && e.ctrlKey){
                handleRedo()
            }
        }
        document.addEventListener('keydown',handleUndoRedoKeyboard)
        return ()=>{
            document.removeEventListener('keydown',handleUndoRedoKeyboard)
        }
    }, [handleUndo,handleRedo])

    return {drawAllMoves,drawMove,handleUndo,handleRedo}
}
