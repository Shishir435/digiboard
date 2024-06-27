import { useUserIds } from '@/common/recoil/users'
import SocketMouse from './SocketMouse'

const MouseRenderer = () => {
  const userIds=useUserIds()

  return (
    <>
    {userIds.map((userId)=><SocketMouse userId={userId} key={userId} />)}
    </>
  )
}

export default MouseRenderer