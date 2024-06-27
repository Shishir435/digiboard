import { useRecoilValue, useSetRecoilState } from "recoil"
import { optionsAtom } from "./options.atom"


export const useOptions=()=>{
    const option=useRecoilValue(optionsAtom)
    return option
}

export const useSetOptions=()=>{
    const setOption=useSetRecoilState(optionsAtom)
    return setOption
}