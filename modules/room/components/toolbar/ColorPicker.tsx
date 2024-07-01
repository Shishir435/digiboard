import { useOptions } from '@/common/recoil/options'
import { AnimatePresence,motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { BsPaletteFill } from 'react-icons/bs'
import { useClickAway } from 'react-use'
import {HexColorPicker} from 'react-colorful'
import { ColorPickerAnimation } from '../../animations/colorPicker.animations'

const ColorPicker = () => {
    const [options,setOptions]=useOptions()
    const ref=useRef<HTMLDivElement>(null)
    const [opened,setOpened]=useState(false)
    useClickAway(ref,()=>setOpened(false))
  return (
    <div className="relative flex items-center" ref={ref}>
      <button
        className="btn-icon"
        onClick={() => setOpened(!opened)}
        style={{backgroundColor: options.lineColor}}
      >
        <BsPaletteFill />
      </button>
      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute left-10 mt-24 sm:left-14"
            variants={ColorPickerAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            <h2 className="ml-3 font-semibold text-black dark:text-white">
              Line color
            </h2>
            <HexColorPicker 
            color={options.lineColor}
            onChange={(e)=>setOptions((prev)=>({...prev,lineColor: e}))}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  )
}

export default ColorPicker