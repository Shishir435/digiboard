import { useModal } from "@/common/recoil/modals";
import React from "react";
import ShareModal from "../../modals/ShareModal";
import { IoIosShareAlt } from "react-icons/io";

const ShareButton = () => {
  const { openModal } = useModal();
  const handleShare = () => openModal(<ShareModal />);
  return (
    <button className="text-2xl" onClick={handleShare}>
      <IoIosShareAlt />
    </button>
  );
};

export default ShareButton;
