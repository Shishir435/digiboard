import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { optionsAtom } from "./options.atom"


export const useOptionsValue=()=>{
    const optionValue=useRecoilValue(optionsAtom)
    return optionValue
}

export const useOptions=()=>{
    const useOptions=useRecoilState(optionsAtom)
    return useOptions
}

export const useSetOptions=()=>{
    const setOption=useSetRecoilState(optionsAtom)
    return setOption
}