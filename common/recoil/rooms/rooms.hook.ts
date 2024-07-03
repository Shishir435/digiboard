import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { DEFAULT_ROOM, roomAtom } from "./rooms.atom"
import { getNextColor } from "@/common/lib/getNextColor"

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
    setRoomId({...DEFAULT_ROOM,id})
   }
   return handleSetRoomId
}

export const useSetUsers=()=>{
    const setRoom=useSetRecoilState(roomAtom)
    const handleAddUser=(userId:string,name:string)=>{
        setRoom((prev)=>{
            const newUsers=prev.users
            const newUsersMoves=prev.usersMoves
            newUsersMoves.set(userId,[])
            const color=getNextColor([...newUsers.values()].pop()?.color)
            newUsers.set(userId,{name,color})
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
        setRoom((prev)=>{
            if(prev.myMoves[prev.myMoves.length-1]?.options.mode==='select'){
                return{
                    ...prev,
                    myMoves: [...(prev.myMoves.slice(0,prev.myMoves.length-1)||[]),move]
                };
            }
            return {...prev,myMoves: [...(prev.myMoves || []),move]}
        })
    }
    const handleRemoveMyMove=()=>{
        let move: Move | undefined;
        setRoom((prev) => {
            const newMoves = [...(prev.myMoves || [])];
            move = newMoves.pop();
            return { ...prev, myMoves: newMoves };
        });
        return move;
    }
    return {handleAddMyMove,handleRemoveMyMove,myMoves: room?.myMoves || []}
}