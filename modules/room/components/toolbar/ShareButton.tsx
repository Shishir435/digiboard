import { useModal } from "@/common/recoil/modals";
import React from "react";
import ShareModal from "../../modals/ShareModal";
import { IoIosShareAlt } from "react-icons/io";

const ShareButton = () => {
  const { openModal } = useModal();
  const handleShare = () => openModal(<ShareModal />);
  return (
    <button onClick={handleShare}>
      <IoIosShareAlt className="size-6" />
    </button>
  );
};

export default ShareButton;
