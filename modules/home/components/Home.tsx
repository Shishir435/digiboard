"use client";
import { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { socket } from "@/common/lib/socket";
import { useModal } from "@/common/recoil/modals";
import { useSetRoomId } from "@/common/recoil/rooms";

import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
import ThemeButton from "@/modules/room/components/toolbar/ThemeButton";
import NotFoundModal from "../modals/NotFound";

const Home = () => {
  const { openModal } = useModal();
  const setAtomRoomId = useSetRoomId();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);

  useEffect(() => {
    socket.on("created", (roomIdFromServer) => {
      setAtomRoomId(roomIdFromServer);
      router.push(roomIdFromServer);
    });

    const handleJoinedRoom = (roomIdFromServer: string, failed?: boolean) => {
      if (!failed) {
        setAtomRoomId(roomIdFromServer);
        router.push(roomIdFromServer);
      } else {
        openModal(<NotFoundModal id={roomId} />);
      }
    };

    socket.on("joined", handleJoinedRoom);

    return () => {
      socket.off("created");
      socket.off("joined", handleJoinedRoom);
    };
  }, [openModal, roomId, router, setAtomRoomId]);

  useEffect(() => {
    socket.emit("leave_room");
    setAtomRoomId("");
  }, [setAtomRoomId]);

  const handleCreateRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("create_room", username);
  };

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (roomId) socket.emit("join_room", roomId, username);
  };

  return (
    <>
      <main className="h-screen flex justify-center items-center dark:bg-black">
        <div className="absolute top-5 left-5">
          <ThemeButton />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-12 md:py-24 px:6 md:px-12 rounded-3xl shadow-xl">
          <div className="flex flex-col gap-4 p-2">
            <h1 className="text-7xl font-extrabold leading-tight">Digiboard</h1>
            <h3 className="text-xl text-center md:text-left sm:text-2xl mb-4 md:mb-8 text-gray-600 italic">
              Real-time whiteboard
            </h3>
          </div>

          <Tabs defaultValue="create" className="max-w-[600px]">
            <TabsList className="w-full flex justify-between">
              <TabsTrigger value="create" className="w-full">
                Create
              </TabsTrigger>
              <TabsTrigger value="join" className="w-full">
                Join
              </TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <form
                className="flex flex-col items-center gap-3"
                onSubmit={handleCreateRoom}
              >
                <Label className="sr-only" htmlFor="username">
                  Enter your name
                </Label>
                <Input
                  autoFocus
                  className="input"
                  id="username"
                  placeholder="Username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value.slice(0, 15))}
                />
                <Button type="submit" className="w-full">
                  Create
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="join">
              <form
                className="flex flex-col items-center gap-3"
                onSubmit={handleJoinRoom}
              >
                <Label className="sr-only" htmlFor="username">
                  Enter your name
                </Label>
                <Input
                  autoFocus
                  className="input"
                  id="username"
                  placeholder="Username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value.slice(0, 15))}
                />
                <Label htmlFor="room-id" className="sr-only">
                  Enter room id
                </Label>
                <Input
                  className="input"
                  id="room-id"
                  placeholder="Room id..."
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
                <Button type="submit" className="w-full">
                  Join
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default Home;
