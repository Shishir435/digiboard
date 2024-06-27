import React, { useEffect, useState } from 'react'
import {useBoardPosition} from '../hooks/useBoardPosition'
import { socket } from '@/common/lib/socket'
import {motion} from "framer-motion"
import {BsCursorFill} from "react-icons/bs"

const SocketMouse = ({userId}:{userId:string}) => {
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
    console.log(pos.x)
  return (
    <motion.div className={`absolute top-0 left-0 text-blue-800 ${pos.x===-1 && "hidden"}`}
    animate={{x:pos.x,y:pos.y}}
    transition={{duration: 0.3, ease: "linear"}}
    >
      <BsCursorFill className="-rotate-90"/>
    </motion.div>
  )
}

export default SocketMouse