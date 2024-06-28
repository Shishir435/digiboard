import UserMouse from './UserMouse'
import { useRoom } from '@/common/recoil/rooms'
import { socket } from '@/common/lib/socket'

const MouseRenderer = () => {
  const room=useRoom()

  return (
    <>
    {[...room.users.keys()].map((userId)=>{
      if(userId===socket.id) return null;
      <UserMouse userId={userId} key={userId} />})}
    </>
  )
}

export default MouseRenderer