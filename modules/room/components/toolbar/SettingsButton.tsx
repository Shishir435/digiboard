import { useModal } from "@/common/recoil/modals";
import { GearIcon } from "@radix-ui/react-icons";
import SettingsModal from "../../modals/SettingsModal";
import { Button } from "@/common/components/ui/button";

const SettingsButton = () => {
  const { openModal } = useModal();
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => openModal(<SettingsModal />)}
      title="Settings"
    >
      <GearIcon className="size-5" />
    </Button>
  );
};

export default SettingsButton;
