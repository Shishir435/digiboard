import { useRecoilValue } from "recoil"
import { optionsAtom } from "./options.atom"


export const useOptions=()=>{
    const option=useRecoilValue(optionsAtom)
    return option
}