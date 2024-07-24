import { useModal } from "@/common/recoil/modals";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Settings from "../components/Settings";

const SettingsModal = () => {
  const { closeModal } = useModal();
  return (
    <div className="relative flex flex-col items-center rounded-md bg-white p-10">
      <button onClick={closeModal} className="absolute top-5 right-5">
        <AiOutlineClose />
      </button>
      <Settings />
    </div>
  );
};

export default SettingsModal;
