import { BsDownload, BsImageFill, BsThreads } from 'react-icons/bs'
import {ImExit} from 'react-icons/im'
import ColorPicker from './ColorPicker'
import LineWidthPicker from './LineWidthPicker'
import Eraser from './Eraser'
import { FaUndo } from 'react-icons/fa'
import ShapeSelector from './ShapeSelector'
import {useRefs} from '../../hooks/useRefs'
import { CANVAS_SIZE } from '@/common/constants/canvasSize'
import { useRouter } from 'next/router'
import { socket } from '@/common/lib/socket'
import ImagePicker  from './ImagePicker'

const ToolBar = () => {
  const {undoRef,canvasRef,bgRef}=useRefs()
  const router=useRouter()
  const handleExit=()=>{
    socket.emit("leave_room")
    router.push('/')
  }
  const handleDownload=()=>{
    const canvas=document.createElement('canvas')
    canvas.width=CANVAS_SIZE.width
    canvas.height=CANVAS_SIZE.height

    const tempCtx=canvas.getContext('2d')
    if(tempCtx && canvasRef.current && bgRef.current){
      tempCtx.drawImage(bgRef.current,0,0)
      tempCtx.drawImage(canvasRef.current,0,0)
    }
    const link=document.createElement('a')
    link.href=canvas.toDataURL('image/png')
    link.download='canvas.png'
    link.click()
  }
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
        <ImagePicker/>
        <button className='text-xl'><BsThreads/></button>
        <button className='text-xl' onClick={handleDownload}><BsDownload/></button>
        <button className="text-xl" onClick={handleExit}>
          <ImExit />
        </button>
    </div>
  )
}

export default ToolBar