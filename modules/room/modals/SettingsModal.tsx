import { useModal } from "@/common/recoil/modals";
import Settings from "../components/Settings";
import { useRef } from "react";
import { useClickAway } from "react-use";

const SettingsModal = () => {
  const { closeModal } = useModal();
  const settingsModelRef = useRef<HTMLDivElement>(null);
  useClickAway(settingsModelRef, () => closeModal());
  return (
    <div
      ref={settingsModelRef}
      className="relative flex flex-col items-center rounded-md p-10"
    >
      <Settings />
    </div>
  );
};

export default SettingsModal;
