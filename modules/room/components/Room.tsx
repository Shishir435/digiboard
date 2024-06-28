import React, { useEffect } from "react";
import RoomContextProvider from "../context/room.context";
import Canvas from "./Canvas";
import MousePosition from "./MousePosition";
import MouseRenderer from "./MouseRenderer";
import ToolBar from "./ToolBar";
import { useRoomId } from "@/common/recoil/rooms";
import { useModal } from "@/common/recoil/modals";
import NotFoundModal from "@/modules/home/modals/NotFound";
import { useRouter } from "next/router";

const Room = () => {
  const roomId = useRoomId();
  const { openModal } = useModal();
  const router = useRouter();
  useEffect(() => {
    if (!roomId) {
      openModal(
        <NotFoundModal id={router.asPath.slice(1) || "room id not found"} />
      );
    }
  }, [roomId, openModal, router.asPath]);

  if (!roomId) {
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
