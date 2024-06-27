import React, { useRef } from 'react'
import { useBoardPosition } from '../hooks/useBoardPosition'
import { useInterval, useMouse } from 'react-use'
import { socket } from '@/common/lib/socket'
import {motion} from 'framer-motion'

const MousePosition = () => {
    const previousPos=useRef<{x:number,y:number}>({x:0,y:0})
    const {x,y}=useBoardPosition()
    const ref=useRef<HTMLDivElement>(null)
    const {docX,docY}=useMouse(ref)
    useInterval(()=>{
        if(previousPos.current.x!==docX || previousPos.current.y!==docY){
            socket.emit("mouse_move",docX-x.get(),docY-y.get())
            previousPos.current={x:docX,y:docY}
        }
        // magic number 300 it will lsiten to events in every 300 miliseconds
    },300)
  return (
    <motion.div
    ref={ref}
    className="absolute top-0 left-0 z-20 select-none"
    animate={{x:docX+15,y:docY+15}}
    transition={{duration: 0.05, ease:"linear"}}
    >
        {docX-x.get()}|{docY-y.get()}
    </motion.div>
  )
}

export default MousePosition