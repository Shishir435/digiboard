"use client"
import { useModal } from "@/common/recoil/modals";
import { CgScreen } from "react-icons/cg";
import BackgroundModal from "../../modals/BackgroundModal";


const BackgroundPicker = () => {
  const { openModal } = useModal();

  return (
    <button className="btn-icon" onClick={() => openModal(<BackgroundModal />)}>
      <CgScreen />
    </button>
  );
};

export default BackgroundPicker;