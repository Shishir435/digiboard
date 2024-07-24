"use client";
import { useRoom } from "@/common/recoil/rooms";

import RoomContextProvider from "../context/room.context";
import Canvas from "./board/Canvas";
import MousePosition from "./board/MousePosition";
import MouseRenderer from "./board/MouseRenderer";
import MoveImage from "./board/MoveImage";
import SelectionBtns from "./board/SelectionBtns";
import Chat from "./chat/Chat";
import NameInput from "./NameInput";
import ToolBar from "./toolbar/ToolBar";
import UserList from "./UserList";
import { useSettingsValue } from "@/common/recoil/settings";

const Room = () => {
  const room = useRoom();
  const { showChat, showMousePosition } = useSettingsValue();
  if (!room.id) return <NameInput />;

  return (
    <RoomContextProvider>
      <div className="relative h-screen w-full overflow-hidden">
        <UserList />
        <ToolBar />
        <SelectionBtns />
        <MoveImage />
        <Canvas />
        {showMousePosition && <MousePosition />}
        <MouseRenderer />
        {showChat && <Chat />}
      </div>
    </RoomContextProvider>
  );
};

export default Room;
