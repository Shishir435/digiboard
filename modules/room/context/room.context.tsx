import { COLORS_ARRAY } from "@/common/constants/colos";
import { socket } from "@/common/lib/socket";
import { useSetRoom, useSetUsers } from "@/common/recoil/rooms";
import { MotionValue, useMotionValue } from "framer-motion";
import React, { createContext, useEffect } from "react";

export const RoomContext = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
}>(null!);

const RoomContextProvider = ({ children }: { children: React.ReactNode }) => {
  const setRoom=useSetRoom()
  const {handleAddUser,handleRemoveUser}=useSetUsers()
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(()=>{
    socket.on("room",(room,usersMovesToParse,usersToParse)=>{
      const usersParsed=new Map<string,string>(JSON.parse(usersToParse))
      const usersMoves=new Map<string,Move[]>(JSON.parse(usersMovesToParse))
      const users=new Map<string,User>()
      usersParsed.forEach((name,id)=>{
        if(id===socket.id) return
        const index=[...usersParsed.keys()].indexOf(id)
        const color=COLORS_ARRAY[index%COLORS_ARRAY.length]
        users.set(id,{
          name,color
        })
      })
      setRoom((prev)=>({
        ...prev,
        users,
        usersMoves,
        movesWithoutUser: room.drawed
      }))
    })
    socket.on("new_user",(userId,userName)=>{
      handleAddUser(userId,userName)
    })
    socket.on("user_disconnected",(userId)=>{
      handleRemoveUser(userId)
    })
    return ()=>{
      socket.off("new_user")
      socket.off("user_disconnected")
    }
  },[handleAddUser,handleRemoveUser,setRoom])
  return (
    <RoomContext.Provider value={{ x, y }}>{children}</RoomContext.Provider>
  );
};

export default RoomContextProvider
