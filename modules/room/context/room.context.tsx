import { socket } from "@/common/lib/socket";
import usersAtom, { useUserIds } from "@/common/recoil/users";
import { MotionValue, useMotionValue } from "framer-motion";
import { createContext, useEffect } from "react";
import React from "react";
import { useSetRecoilState } from "recoil";

export const RoomContext = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
}>(null!);

const RoomContextProvider = ({ children }: { children: React.ReactNode }) => {
  const setUsers=useSetRecoilState(usersAtom)
  const usersIds=useUserIds()
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(()=>{
    socket.on("users_in_room",(newUsers)=>{
      newUsers.forEach((user)=>{
        if(!usersIds.includes(user) && user!==socket.id){
          setUsers((prevUsers)=>({...prevUsers,[user]:[]}))
        }
      })
    })
    socket.on("user_disconnected",(userId)=>{
      setUsers((prevUsers)=>{
        const newUsers={...prevUsers}
        delete newUsers[userId]
        return prevUsers
      })
    })
    return ()=>{
      socket.off("users_in_room")
      socket.off("user_disconnected")
    }
  },[setUsers,usersIds])
  return (
    <RoomContext.Provider value={{ x, y }}>{children}</RoomContext.Provider>
  );
};

export default RoomContextProvider
