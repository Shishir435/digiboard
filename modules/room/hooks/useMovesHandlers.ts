import { socket } from "@/common/lib/socket"
import { useMyMoves, useRoom } from "@/common/recoil/rooms"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useRefs } from "./useRefs"

let prevMovesLength=0
export const useMovesHandlers = () => {
    const { canvasRef, miniMapRef } = useRefs()
    const room = useRoom()
    const { handleAddMyMove, handleRemoveMyMove } = useMyMoves()
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>()

    useEffect(() => {
        const newCtx = canvasRef?.current?.getContext('2d')
        if (newCtx) setCtx(newCtx)
    }, [canvasRef])

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

    const drawMove = useCallback((move: Move) => {
        new Promise((resolve) => {
            const { path } = move
            if (!ctx && !path.length) {
                resolve('bye')
                return
            }
            const moveOptions = move.options
            if (moveOptions.shape === 'image') {
                const image = new Image()
                image.src = move.base64
                image.addEventListener('load', () => {
                    ctx?.drawImage(image, path[0][0], path[0][1])
                    copyCanvasToSmall()
                    resolve('bye')
                })
                return
            }
            if (!ctx) {
                resolve('bye')
                return
            }
            ctx.lineWidth = moveOptions.lineWidth
            ctx.strokeStyle = moveOptions.lineColor
            if (move.eraser) ctx.globalCompositeOperation = 'destination-out'
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
                    ctx.beginPath()
                    ctx.arc(path[0][0], path[0][1], move.radius, 0, 2 * Math.PI);
                    ctx.stroke()
                    ctx.closePath()
                    break;
                case "rectangle":
                    ctx.beginPath()
                    ctx.rect(path[0][0], path[0][1], move.width, move.height)
                    ctx.stroke()
                    ctx.closePath()
                    break;
                default:
                    break;
            }
            copyCanvasToSmall()
            resolve('bye')
        })
    },[copyCanvasToSmall,ctx])

    const drawAllMoves=useCallback(async()=>{
        if(!ctx) return;
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
        for(const move of sortedMoves){
            await drawMove(move)
        }
    },[ctx,drawMove,sortedMoves])

    useEffect(()=>{
        socket.on('your_move',(move)=>{
            handleAddMyMove(move)
        })
        return ()=>{
            socket.off('your_move')
        }
    },[handleAddMyMove])
    useEffect(()=>{
        if(prevMovesLength >=sortedMoves.length || !prevMovesLength){
            drawAllMoves()
        }else{
            drawMove(sortedMoves[sortedMoves.length-1])
        }
        return ()=>{
            prevMovesLength=sortedMoves.length
        }
    },[sortedMoves,drawAllMoves,drawMove])
    
    const handleUndo=useCallback(()=>{
        if(ctx){
            handleRemoveMyMove()
            socket.emit("undo")
        }
    },[ctx,handleRemoveMyMove])
    useEffect(()=>{
        const handleUndoKeyboard=(e:KeyboardEvent)=>{
            if(e.ctrlKey && e.key==='z'){
                handleUndo()
            }
        }
        document.addEventListener('keydown',handleUndoKeyboard)
        return ()=>{
            document.removeEventListener('keydown',handleUndoKeyboard)
        }
    }, [handleUndo])

    return {drawAllMoves,drawMove,handleUndo}
}
