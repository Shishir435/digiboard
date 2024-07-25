import { Button } from "@/common/components/ui/button";
import { useModal } from "@/common/recoil/modals";
import { Share1Icon } from "@radix-ui/react-icons";
import ShareModal from "../../modals/ShareModal";

const ShareButton = () => {
  const { openModal } = useModal();
  const handleShare = () => openModal(<ShareModal />);
  return (
    <Button size="icon" variant="ghost" onClick={handleShare}>
      <Share1Icon />
    </Button>
  );
};

export default ShareButton;
