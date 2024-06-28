import { BsChatFill, BsDownload, BsImageFill, BsThreads } from 'react-icons/bs'
import ColorPicker from './ColorPicker'
import LineWidthPicker from './LineWidthPicker'

const ToolBar = () => {

  return (
    <div className="absolute top-[50%] left-10 z-50 flex flex-col items-center rounded-lg p-5 gap-5 bg-black text-white" style={{transform: 'translateY(-50%)'}}>
        <ColorPicker/>
        <LineWidthPicker/>
        <button className='text-xl'><BsChatFill/></button>
        <button className='text-xl'><BsImageFill/></button>
        <button className='text-xl'><BsThreads/></button>
        <button className='text-xl'><BsDownload/></button>
    </div>
  )
}

export default ToolBar