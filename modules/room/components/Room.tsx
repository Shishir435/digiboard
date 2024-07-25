"use client";
import { useRoom } from "@/common/recoil/rooms";

import { useSettingsValue } from "@/common/recoil/settings";
import Canvas from "./board/Canvas";
import MousePosition from "./board/MousePosition";
import MouseRenderer from "./board/MouseRenderer";
import MoveImage from "./board/MoveImage";
import SelectionBtns from "./board/SelectionBtns";
import Chat from "./chat/Chat";
import NameInput from "./NameInput";
import ToolBar from "./toolbar/ToolBar";
import UserList from "./UserList";
import SettingsButton from "./toolbar/SettingsButton";
import HistoryBtns from "./toolbar/HistrotyBtns";
import ThemeButton from "./toolbar/ThemeButton";

const Room = () => {
  const room = useRoom();
  const { showChat, showMousePosition } = useSettingsValue();
  if (!room.id)
    return (
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute z-[60] top-5 left-5 flex items-center gap-4">
          <ThemeButton />
        </div>
        <NameInput />
      </div>
    );

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute z-[60] top-5 left-5 flex items-center gap-4">
          <SettingsButton />
          <ThemeButton />
        </div>
        <UserList />
        <ToolBar />
        <SelectionBtns />
        <MoveImage />
        <Canvas />
        {showMousePosition && <MousePosition />}
        <MouseRenderer />
        <div className="absolute z-10 bottom-5 left-5">
          <HistoryBtns />
        </div>
        {showChat && <Chat />}
      </div>
    </>
  );
};

export default Room;
