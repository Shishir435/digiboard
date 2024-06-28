import { socket } from "@/common/lib/socket";
import { useRoom, useSetRoomId } from "@/common/recoil/rooms";
import { useRouter } from "next/router";
import { useEffect } from "react";
import RoomContextProvider from "../context/room.context";
import Canvas from "./Canvas";
import MousePosition from "./MousePosition";
import MouseRenderer from "./MouseRenderer";
import ToolBar from "./ToolBar";

const Room = () => {
  const room=useRoom()
  const setRoomId=useSetRoomId()
  const router = useRouter();
  useEffect(()=>{
    const handleJoined=(roomidFromServer:string,failed?:boolean)=>{
      if(failed) router.push("/")
      else setRoomId(roomidFromServer)
    }
    socket.on("joined",handleJoined)
    return ()=>{
    socket.off("joined",handleJoined)
    }
  },[router,setRoomId])
  
  if (!room.id) {
    const dynamicRoomId=router.query.roomId?.toString()
    if(dynamicRoomId) socket.emit("join_room",dynamicRoomId)
    return null; 
  }
  return (
    <RoomContextProvider>
      <div className="h-full w-full overflow-hidden relative">
        <ToolBar />
        <Canvas />
        <MousePosition />
        <MouseRenderer />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
