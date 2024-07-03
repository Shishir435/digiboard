import React, { useRef } from 'react'
import { useBoardPosition } from '../../hooks/useBoardPosition'
import { useInterval, useMouse } from 'react-use'
import { socket } from '@/common/lib/socket'
import {motion} from 'framer-motion'
import { getPos } from '@/common/lib/getPos'

const MousePosition = () => {
    const previousPos=useRef<{x:number,y:number}>({x:0,y:0})
    const {x,y}=useBoardPosition()
    const ref=useRef<HTMLDivElement>(null)
    const {docX,docY}=useMouse(ref)
    useInterval(()=>{
        if(previousPos.current.x!==docX || previousPos.current.y!==docY){
            socket.emit("mouse_move",getPos(docX,x),getPos(docY,y))
            previousPos.current={x:docX,y:docY}
        }
        // magic number 150 it will lsiten to events in every 300 miliseconds
    },150)
  return (
    <motion.div
    ref={ref}
    className="absolute top-0 left-0 z-50 select-none pointer-events-none transition-colors dark:text-white"
    animate={{x:docX+15,y:docY+15}}
    transition={{duration: 0.05, ease:"linear"}}
    >
        {getPos(docX,x).toFixed(0)}|{getPos(docY,y)}
    </motion.div>
  )
}

export default MousePosition