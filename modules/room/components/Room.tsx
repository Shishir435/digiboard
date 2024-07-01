import { useRoom } from "@/common/recoil/rooms";
import RoomContextProvider from "../context/room.context";

import MousePosition from "./board/MousePosition";
import MouseRenderer from "./board/MouseRenderer";
import NameInput from "./NameInput";
import ToolBar from "./toolbar/ToolBar";
import UserList from "./UserList";
import { useRef } from "react";
import Canvas from "./board/Canvas";

const Room = () => {
  const undoRef=useRef<HTMLButtonElement>(null)
  const room=useRoom()
  if(!room.id) return <NameInput/>
  return (
    <RoomContextProvider>
      <div className="h-full w-full overflow-hidden relative">
        <UserList/>
        <ToolBar undoRef={undoRef} />
        <Canvas undoRef={undoRef} />
        <MousePosition />
        <MouseRenderer />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
