import { useContext } from 'react'
import { RoomContext } from '../context/room.context'

export const useRefs = () => {
  const {bgRef,canvasRef,undoRef,miniMapRef}=useContext(RoomContext)
  return {bgRef,undoRef,canvasRef,miniMapRef}
}
