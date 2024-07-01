import { socket } from "@/common/lib/socket";
import { useModal } from "@/common/recoil/modals";
import { useSetRoomId } from "@/common/recoil/rooms";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import NotFoundModal from "../modals/NotFound";

const Home = () => {
  const [roomId, setRoomId] = useState("")
  const [userName,setUserName]=useState("")
  const router = useRouter()
  const setAtomRoomId = useSetRoomId()
  const {openModal}=useModal()
  useEffect(() => {
    socket.on("created", (roomIdFromServer) => {
      setAtomRoomId(roomIdFromServer);
      router.push(roomIdFromServer);
    });
    const handleJoinedRoom= (roomIdFromServer:string, failed?:boolean) => {
      if (!failed) {
        router.push(roomIdFromServer);
        setAtomRoomId(roomIdFromServer);
      } else {
        openModal(<NotFoundModal id={roomId}/>)
      }
    }
    socket.on("joined", handleJoinedRoom)
    return () => {
      socket.off("created");
      socket.off("joined",handleJoinedRoom);
    };
  }, [router,setAtomRoomId,openModal,roomId]);
  useEffect(()=>{
    socket.emit("leave_room")
    setAtomRoomId("")
  },[setAtomRoomId])
  const handleCreateRoom = () => {
    socket.emit("create_room",userName);
  };
  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("join_room", roomId,userName);
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-24 font-extrabold">Digiboard</h1>
      <div className="mt-10 flex flex-col gap-2">
        <label className="self-start font-bold leading-tight">
          Enter your name
        </label>
        <input
          className="input"
          id="room-id"
          placeholder="Username..."
          value={userName}
          onChange={(e) => setUserName(e.target.value.slice(0, 15))}
        />
      </div>

      <form
        className="flex flex-col items-center gap-3"
        onSubmit={handleJoinRoom}
      >
        <label htmlFor="room-id" className="self-start font-bold leading-tight">
          Enter room id
        </label>
        <input
          className="input"
          id="room-id"
          placeholder="room id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button className="btn" type="submit">
          Join
        </button>
      </form>
      <div className="my-8 flex w-96 items-center gap-2">
        <div className="h-px w-full bg-zinc-200" />
        <p className="text-zinc-400">or</p>
        <div className="h-px w-full bg-zinc-200" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <h5 className="self-start font-bold leading-tight">Create new room</h5>

        <button className="btn" onClick={handleCreateRoom}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Home;
