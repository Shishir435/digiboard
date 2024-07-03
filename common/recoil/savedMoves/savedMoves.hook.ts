import { useRecoilValue, useSetRecoilState } from "recoil"
import { savedMovesAtom } from "./savedMoves.atom"

export const useSetSavedMoves=()=>{
    const setSavedMoves=useSetRecoilState(savedMovesAtom)
    const addSavedMove=(move:Move)=>{
        if(move.options.mode==='select') return;
        setSavedMoves((prev)=>([...prev,move]))
    }
    const removeSavedMove=()=>{
        let move: Move|undefined
        setSavedMoves((prev)=>{
            move=prev[0]
            return prev.slice(1)
        })
        return move
    }
    const clearSavedMove=()=>{
        setSavedMoves([])
    }
    return {addSavedMove,removeSavedMove,clearSavedMove}
}

export const useSavedMoves=()=>{
    const savedMoves=useRecoilValue(savedMovesAtom)
    return savedMoves
}