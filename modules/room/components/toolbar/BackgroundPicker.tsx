"use client";
import { Button } from "@/common/components/ui/button";
import { useModal } from "@/common/recoil/modals";
import { DesktopIcon } from "@radix-ui/react-icons";
import BackgroundModal from "../../modals/BackgroundModal";

const BackgroundPicker = () => {
  const { openModal } = useModal();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => openModal(<BackgroundModal />)}
    >
      <DesktopIcon />
    </Button>
  );
};

export default BackgroundPicker;
