import React, { useEffect, useState } from 'react'
import {useBoardPosition} from '../../hooks/useBoardPosition'
import { socket } from '@/common/lib/socket'
import {motion} from "framer-motion"
import {BsCursorFill} from "react-icons/bs"
import { useRoom } from '@/common/recoil/rooms'

const UserMouse = ({userId}:{userId:string}) => {
    const {users}=useRoom()
    const boardPos=useBoardPosition()
    const [x,setX]=useState(boardPos.x.get())
    const [y,setY]=useState(boardPos.y.get())

    const [pos,setPos]=useState({x:-1,y:-1})
    useEffect(()=>{
      socket.on("mouse_moved",(newX,newY,socketIdMoved)=>{
        if(userId===socketIdMoved){
          setPos({x: newX,y:newY})
        }
      })
      return ()=>{
        socket.off("mouse_moved")
      }
    },[userId])

    useEffect(()=>{
      const unsubscribe=boardPos.x.onChange(setX)
      return unsubscribe
    },[boardPos.x])

    useEffect(()=>{
      const unsubscribe=boardPos.y.onChange(setY)
      return unsubscribe
    },[boardPos.y])
  return (
    <motion.div className={`absolute top-0 left-0 text-blue-800 ${pos.x===-1 && "hidden"} pointer-events-none`}
    animate={{x:pos.x+x,y:pos.y+y}}
    style={{color: users.get(userId)?.color}}
    transition={{duration: 0.1, ease: "linear"}}
    >
      <BsCursorFill className="-rotate-90"/>
      <span className='ml-2'>{users.get(userId)?.name || "Anonymous"}</span>
    </motion.div>
  )
}

export default UserMouse