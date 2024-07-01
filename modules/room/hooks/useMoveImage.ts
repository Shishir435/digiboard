import { useContext } from "react"
import { RoomContext } from "../context/room.context"


export const useMoveImage = () => {
  const {moveImage,setMoveImage}=useContext(RoomContext)
  return {moveImage,setMoveImage}
}
