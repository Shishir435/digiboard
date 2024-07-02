import { COLORS_ARRAY } from "@/common/constants/colos";
import { socket } from "@/common/lib/socket";
import { useRoom, useSetRoom, useSetUsers } from "@/common/recoil/rooms";
import { MotionValue, useMotionValue } from "framer-motion";
import React, { createContext, Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import {toast} from 'react-toastify'
export const RoomContext = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
  undoRef: RefObject<HTMLButtonElement>;
  redoRef: RefObject<HTMLButtonElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  miniMapRef: RefObject<HTMLCanvasElement>;
  bgRef: RefObject<HTMLCanvasElement>;
  moveImage: string;
  setMoveImage: (base64:string)=>void;
}>(null!);

const RoomContextProvider = ({ children }: { children: React.ReactNode }) => {
  const setRoom=useSetRoom()
  const {users}=useRoom()
  const {handleAddUser,handleRemoveUser}=useSetUsers()
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const undoRef=useRef<HTMLButtonElement>(null)
  const redoRef=useRef<HTMLButtonElement>(null)
  const canvasRef=useRef<HTMLCanvasElement>(null)
  const miniMapRef=useRef<HTMLCanvasElement>(null)
  const bgRef =useRef<HTMLCanvasElement>(null)
  const [moveImage,setMoveImage]=useState("")
  useEffect(()=>{
    socket.on("room",(room,usersMovesToParse,usersToParse)=>{
      const usersParsed=new Map<string,string>(JSON.parse(usersToParse))
      const usersMoves=new Map<string,Move[]>(JSON.parse(usersMovesToParse))
      const newUsers=new Map<string,User>()
      usersParsed.forEach((name,id)=>{
        if(id===socket.id) return
        const index=[...usersParsed.keys()].indexOf(id)
        const color=COLORS_ARRAY[index%COLORS_ARRAY.length]
        newUsers.set(id,{
          name,color
        })
      })
      setRoom((prev)=>({
        ...prev,
        users: newUsers,
        usersMoves,
        movesWithoutUser: room.drawed
      }))
    })
    socket.on("new_user",(userId,userName)=>{
      handleAddUser(userId,userName)
      toast(`${userName} has joined the room`,{
        position: 'top-center',
        theme: 'colored'
      })
    })
    socket.on("user_disconnected",(userId)=>{
      handleRemoveUser(userId)
      toast(`${users.get(userId)?.name || "Anonymous"} has left the room`,{
        position: 'top-center',
        theme: 'colored'
      })
    })
    return ()=>{
      socket.off("new_user")
      socket.off("user_disconnected")
    }
  },[handleAddUser,handleRemoveUser,setRoom,users])
  return (
    <RoomContext.Provider value={{ x, y,undoRef,redoRef,canvasRef,bgRef,miniMapRef,moveImage,setMoveImage }}>{children}</RoomContext.Provider>
  );
};

export default RoomContextProvider
