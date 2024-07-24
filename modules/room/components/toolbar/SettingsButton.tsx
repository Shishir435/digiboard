import { useModal } from "@/common/recoil/modals";
import { BsGearFill } from "react-icons/bs";
import SettingsModal from "../../modals/SettingsModal";

const SettingsButton = () => {
  const { openModal } = useModal();
  return (
    <button
      className="btn-icon text-xl"
      onClick={() => openModal(<SettingsModal />)}
    >
      <BsGearFill />
    </button>
  );
};

export default SettingsButton;
