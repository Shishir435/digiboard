"use client";
import { FormEvent, useEffect, useState } from "react";

import { useRouter, usePathname } from "next/navigation";
import { socket } from "@/common/lib/socket";
import { useModal } from "@/common/recoil/modals";
import { useSetRoomId } from "@/common/recoil/rooms";
import NotFoundModal from "@/modules/home/modals/NotFound";
import { Label } from "@/common/components/ui/label";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";

const NameInput = () => {
  const setRoomId = useSetRoomId();
  const { openModal } = useModal();

  const [name, setName] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const roomId = (pathname.substring(1) || "").toString();

  useEffect(() => {
    if (!roomId) return;

    socket.emit("check_room", roomId);

    socket.on("room_exists", (exists) => {
      if (!exists) {
        router.push("/");
      }
    });

    return () => {
      socket.off("room_exists");
    };
  }, [roomId, router]);

  useEffect(() => {
    const handleJoined = (roomIdFromServer: string, failed?: boolean) => {
      if (failed) {
        router.push("/");
        openModal(<NotFoundModal id={roomIdFromServer} />);
      } else setRoomId(roomIdFromServer);
    };

    socket.on("joined", handleJoined);

    return () => {
      socket.off("joined", handleJoined);
    };
  }, [openModal, router, setRoomId]);

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("join_room", roomId, name);
  };

  return (
    <form
      className="my-24 flex flex-col items-center max-w-[600px] mx-auto"
      onSubmit={handleJoinRoom}
    >
      <h1 className="text-5xl font-extrabold leading-tight sm:text-extra">
        Digiboard
      </h1>
      <h3 className="text-xl sm:text-2xl">Real-time whiteboard</h3>

      <div className="mt-4 mb-3 flex flex-col gap-2">
        <Label className="sr-only">Enter your name</Label>
        <Input
          autoFocus
          className="rounded-xl border p-5 py-1"
          id="room-id"
          placeholder="Username..."
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 15))}
        />
        <Button className="w-full" type="submit">
          Enter room
        </Button>
      </div>
    </form>
  );
};

export default NameInput;
