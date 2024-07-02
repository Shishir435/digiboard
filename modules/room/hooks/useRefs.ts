import { useContext } from 'react'
import { RoomContext } from '../context/room.context'

export const useRefs = () => {
  const {bgRef,canvasRef,undoRef,redoRef,miniMapRef}=useContext(RoomContext)
  return {bgRef,undoRef,redoRef,canvasRef,miniMapRef}
}
