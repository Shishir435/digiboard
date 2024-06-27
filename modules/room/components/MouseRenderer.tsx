import { useUserIds } from '@/common/recoil/users'
import UserMouse from './UserMouse'

const MouseRenderer = () => {
  const userIds=useUserIds()

  return (
    <>
    {userIds.map((userId)=><UserMouse userId={userId} key={userId} />)}
    </>
  )
}

export default MouseRenderer