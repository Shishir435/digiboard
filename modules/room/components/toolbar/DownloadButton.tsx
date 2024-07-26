import { Button } from "@/common/components/ui/button";
import { CANVAS_SIZE } from "@/common/constants/canvas";
import { DownloadIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useRefs } from "../../hooks/useRefs";
import TooltipContainer from "@/common/components/ui/tooltip";

const DownloadButton = () => {
  const { canvasRef, bgRef } = useRefs();
  const pathname = usePathname();
  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE.width;
    canvas.height = CANVAS_SIZE.height;

    const tempCtx = canvas.getContext("2d");

    if (tempCtx && canvasRef.current && bgRef.current) {
      tempCtx.drawImage(bgRef.current, 0, 0);
      tempCtx.drawImage(canvasRef.current, 0, 0);
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${pathname.substring(1) || "canvas"}.png`;
    link.click();
  };
  return (
    <TooltipContainer
      trigger={
        <Button size="icon" variant="ghost" onClick={handleDownload}>
          <DownloadIcon />
        </Button>
      }
      hoverText="Download This Canvas"
    />
  );
};

export default DownloadButton;
