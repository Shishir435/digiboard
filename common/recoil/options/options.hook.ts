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

export const useSetSelection=()=>{
    const setOptions=useSetOptions()
    const setSelection=(rect:{
        x:number,
        y: number,
        width: number,
        height: number
    })=>{
        setOptions((prev)=>({
            ...prev,
            selection: rect
        }))
    }
    const clearSelection=()=>{
        setOptions((prev)=>({...prev,selection: null}))
    }
    return {setSelection,clearSelection}
}