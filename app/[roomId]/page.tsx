"use client";
import ContextMenu from "@/modules/room/components/ContextMenu";
import Room from "@/modules/room/components/Room";
import { useRef } from "react";
const DynamicRoom = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative">
      <ContextMenu />
      <Room />
    </div>
  );
};

export default DynamicRoom;
