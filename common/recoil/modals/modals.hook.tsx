import { useSetRecoilState } from "recoil"
import { modalAtom } from "./modals.atom"

export const useModal=()=>{
    const setModal=useSetRecoilState(modalAtom)
    const openModal=(modal: JSX.Element | JSX.Element[])=>{
        setModal({modal,opened:true})
    }
    const closeModal=()=>{
        setModal({modal:<></>,opened:false})
    }
    return {openModal,closeModal}
}