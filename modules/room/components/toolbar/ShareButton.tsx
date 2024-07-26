import { Button } from "@/common/components/ui/button";
import { useModal } from "@/common/recoil/modals";
import { Share1Icon } from "@radix-ui/react-icons";
import ShareModal from "../../modals/ShareModal";
import TooltipContainer from "@/common/components/ui/tooltip";

const ShareButton = () => {
  const { openModal } = useModal();
  const handleShare = () => openModal(<ShareModal />);
  return (
    <TooltipContainer
      trigger={
        <Button size="icon" variant="ghost" onClick={handleShare}>
          <Share1Icon />
        </Button>
      }
      hoverText="Share This Room"
    />
  );
};

export default ShareButton;
