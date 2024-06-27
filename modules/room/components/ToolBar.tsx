import { useSetOptions } from '@/common/recoil/options/options.hook'
import React from 'react'

const ToolBar = () => {
    const setOptions=useSetOptions()
  return (
    <div className="absolute top-0 left-0 z-50 flex gap-5 bg-black text-white">
        <button className="" onClick={()=>setOptions((prev)=>({...prev,lineColor:'red'}))}>Red</button>
        <button className="" onClick={()=>setOptions((prev)=>({...prev,lineColor:'blue'}))}>Blue</button>
        <button className="" onClick={()=>setOptions((prev)=>({...prev,lineColor:'green'}))}>Green</button>
        <button className="" onClick={()=>setOptions((prev)=>({...prev,lineColor:'balck'}))}>Black</button>
    </div>
  )
}

export default ToolBar