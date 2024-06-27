import React from "react";
import RoomContextProvider from "../context/room.context";
import Canvas from "./Canvas";
import MousePosition from "./MousePosition";
import MouseRenderer from "./MouseRenderer";
import ToolBar from "./ToolBar";
import { useRoomId } from "@/common/recoil/rooms";

const Room = () => {
  const roomId=useRoomId()
  if(!roomId) return (<div>No room id</div>)
  return (
    <RoomContextProvider>
      <div className="h-full w-full overflow-hidden relative">
        <ToolBar/>
        <Canvas />
        <MousePosition />
        <MouseRenderer />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
