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
import DownloadButton from "./toolbar/DownloadButton";
import ExitButton from "./toolbar/ExitButton";
import HistoryBtns from "./toolbar/HistrotyBtns";
import SettingsButton from "./toolbar/SettingsButton";
import ShareButton from "./toolbar/ShareButton";
import ThemeButton from "./toolbar/ThemeButton";
import ToolBar from "./toolbar/ToolBar";
import UserList from "./UserList";

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
        <div className="absolute z-[60] top-7 md:top-5 left-5 flex items-center gap-4">
          <SettingsButton />
          <ThemeButton />
        </div>
        <div className="absolute hidden md:flex z-[60] bottom-20 left-1/2">
          <UserList />
        </div>
        <ToolBar />
        <SelectionBtns />
        <MoveImage />
        <Canvas />
        {showMousePosition && <MousePosition />}
        <MouseRenderer />
        <div className="absolute z-10 bottom-5 left-5 flex gap-4">
          <HistoryBtns />
          <div className="bg-toolbar rounded-md text-toolbar-foreground flex gap-2 shadow">
            <ShareButton />
            <DownloadButton />
            <ExitButton />
          </div>
        </div>
        {showChat && <Chat />}
      </div>
    </>
  );
};

export default Room;
