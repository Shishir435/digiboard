import { useModal } from "@/common/recoil/modals";
import { BsGearFill } from "react-icons/bs";
import SettingsModal from "../../modals/SettingsModal";

const SettingsButton = () => {
  const { openModal } = useModal();
  return (
    <button onClick={() => openModal(<SettingsModal />)}>
      <BsGearFill className="size-6" />
    </button>
  );
};

export default SettingsButton;
