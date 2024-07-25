"use client";
import ContextMenu from "@/modules/room/components/ContextMenu";
import Room from "@/modules/room/components/Room";
import RoomContextProvider from "@/modules/room/context/room.context";
import { useRef } from "react";
const DynamicRoom = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <RoomContextProvider>
      <div ref={ref} className="relative">
        <ContextMenu />
        <Room />
      </div>
    </RoomContextProvider>
  );
};

export default DynamicRoom;
