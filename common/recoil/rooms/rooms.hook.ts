import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { roomAtom } from "./rooms.atom"

export const useRoom=()=>{
    const room=useRecoilValue(roomAtom)
    return room
}

export const useSetRoom=()=>{
    const setRoom=useSetRecoilState(roomAtom)
    return setRoom
}

export const useRoomId=()=>{
    const {id}=useRecoilValue(roomAtom)
    return id
}

export const useSetRoomId=()=>{
   const setRoomId=useSetRecoilState(roomAtom)
   const handleSetRoomId=(id:string)=>{
    setRoomId((prev)=>({...prev,id}))
   }
   return handleSetRoomId
}

export const useSetUsers=()=>{
    const setRoom=useSetRecoilState(roomAtom)
    const handleAddUser=(userId:string,userName:string)=>{
        setRoom((prev)=>{
            const newUsers=prev.users
            const newUsersMoves=prev.usersMoves
            newUsersMoves.set(userId,[])
            newUsers.set(userId,userName)
            return {...prev,users:newUsers,usersMoves:newUsersMoves}
        })
    }
    const handleRemoveUser=(userId:string)=>{
        setRoom((prev)=>{
            const newUsers=prev.users
            const newUsersMoves=prev.usersMoves
            const userMoves=newUsersMoves.get(userId)
            newUsers.delete(userId)
            newUsersMoves.delete(userId)
            return {
                ...prev,
                users:newUsers,
                usersMoves: newUsersMoves,
                movesWithoutUser: [...prev.movesWithoutUser,...(userMoves||[])]
            }
        })
    }

    const handleAddMoveToUser=(userId:string,moves:Move)=>{
        setRoom((prev)=>{
            const newUsersMoves=prev.usersMoves
            const olMoves=prev.usersMoves.get(userId)
            newUsersMoves.set(userId,[...(olMoves||[]),moves])
            return {
                ...prev,
                usersMoves: newUsersMoves
            }
        })
    }
    const handleRemoveMoveFromUser=(userId:string)=>{
        setRoom((prev)=>{
            const newUsersMoves=prev.usersMoves
            const userMoves=prev.usersMoves.get(userId)
            userMoves?.pop()
            newUsersMoves.set(userId,userMoves||[])
            return {
                ...prev,
                usersMoves: newUsersMoves
            }
        })
    }

    return {
        handleAddMoveToUser,
        handleAddUser,
        handleRemoveMoveFromUser,
        handleRemoveUser
    }
}

export const useMyMoves=()=>{
    const [room,setRoom]=useRecoilState(roomAtom)
    const handleAddMyMove=(move:Move)=>{
        setRoom((prev)=>({...prev,myMoves: {...prev.myMoves,move}}))
    }
    const handleRemoveMyMove=()=>{
        const newMoves=[...room.myMoves]
        newMoves.pop()
        setRoom((prev)=>({...prev,myMoves:newMoves}))
    }
    return {handleAddMyMove,handleRemoveMyMove,myMoves: room.myMoves}
}