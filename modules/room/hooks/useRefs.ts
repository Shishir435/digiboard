import { useContext } from 'react'
import { RoomContext } from '../context/room.context'

const useRefs = () => {
  const {bgRef,canvasRef,undoRef}=useContext(RoomContext)
  return {bgRef,undoRef,canvasRef}
}

export default useRefs