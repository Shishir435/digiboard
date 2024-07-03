import { CANVAS_SIZE } from '@/common/constants/canvasSize'
import { useRouter } from 'next/router'
import { BsDownload } from 'react-icons/bs'
import { ImExit } from 'react-icons/im'
import {IoIosShareAlt} from 'react-icons/io'
import { useRefs } from '../../hooks/useRefs'
import ColorPicker from './ColorPicker'
import HistoryBtns from './HistrotyBtns'
import ImagePicker from './ImagePicker'
import LineWidthPicker from './LineWidthPicker'
import ModePicker from './ModePicker'
import ShapeSelector from './ShapeSelector'
import ShareModal from '../../modals/ShareModal'
import { useModal } from '@/common/recoil/modals'
import BackgroundPicker from './BackgroundPicker'

const ToolBar = () => {
  const {canvasRef,bgRef}=useRefs()
  const router=useRouter()
  const {openModal}=useModal()
  const handleExit=()=>{
    // socket.emit("leave_room")
    router.push('/')
  }
  const handleShare=()=>(openModal(<ShareModal/>))
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
        <HistoryBtns/>
        <div className="h-px w-full bg-white" />
        <ShapeSelector/>
        <ColorPicker/>
        <LineWidthPicker/>
        <ImagePicker/>
        <ModePicker/>
        <div className="h-px w-full bg-white"></div>
        <BackgroundPicker/>
        <button className="btn-icon text-2xl" onClick={handleShare}>
          <IoIosShareAlt />
        </button>
        <button className='text-xl' onClick={handleDownload}><BsDownload/></button>
        <button className="text-xl" onClick={handleExit}>
          <ImExit />
        </button>
    </div>
  )
}

export default ToolBar