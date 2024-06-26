import { BsDownload, BsImageFill, BsThreads } from 'react-icons/bs'
import ColorPicker from './ColorPicker'
import LineWidthPicker from './LineWidthPicker'
import Eraser from './Eraser'
import { RefObject } from 'react'
import { FaUndo } from 'react-icons/fa'
import ShapeSelector from './ShapeSelector'

const ToolBar = ({undoRef}:{undoRef: RefObject<HTMLButtonElement>}) => {
  return (
    <div className="absolute top-[50%] left-10 z-50 flex flex-col items-center rounded-lg p-5 gap-5 bg-zinc-900 text-white" style={{transform: 'translateY(-50%)'}}>
        <button ref={undoRef}>
          <FaUndo/>
        </button>
        <div className="h-px w-full bg-white 2xl:hidden" />
        <ShapeSelector/>
        <ColorPicker/>
        <LineWidthPicker/>
        <Eraser/>
        <button className='text-xl'><BsImageFill/></button>
        <button className='text-xl'><BsThreads/></button>
        <button className='text-xl'><BsDownload/></button>
    </div>
  )
}

export default ToolBar