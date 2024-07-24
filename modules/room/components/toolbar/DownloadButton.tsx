import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import React from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { useRefs } from "../../hooks/useRefs";
import { usePathname } from "next/navigation";

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
    <button className="text-2xl" onClick={handleDownload}>
      <HiOutlineDownload />
    </button>
  );
};

export default DownloadButton;
