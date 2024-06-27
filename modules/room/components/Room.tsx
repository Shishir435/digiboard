import React from "react";
import RoomContextProvider from "../context/room.context";
import Canvas from "./Canvas";
import MousePosition from "./MousePosition";
import MouseRenderer from "./MouseRenderer";
import ToolBar from "./ToolBar";

const Room = () => {
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
