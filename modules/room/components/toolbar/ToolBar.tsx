import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { useRouter } from "next/router";
import { BsDownload } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { FiChevronRight } from 'react-icons/fi'
import { IoIosShareAlt } from "react-icons/io";
import { useRefs } from "../../hooks/useRefs";
import ColorPicker from "./ColorPicker";
import HistoryBtns from "./HistrotyBtns";
import ImagePicker from "./ImagePicker";
import LineWidthPicker from "./LineWidthPicker";
import ModePicker from "./ModePicker";
import ShapeSelector from "./ShapeSelector";
import ShareModal from "../../modals/ShareModal";
import { useModal } from "@/common/recoil/modals";
import BackgroundPicker from "./BackgroundPicker";
import {motion} from 'framer-motion'
import { useViewPortSize } from "@/common/hooks/useViewPortSize";
import { useEffect, useState } from "react";
import { DEFAULT_EASE } from "@/common/constants/easings";

const ToolBar = () => {
  const { canvasRef, bgRef } = useRefs();
  const router = useRouter();
  const { width } = useViewPortSize();
  const [opened, setOpened] = useState(false);
  const { openModal } = useModal();
  useEffect(() => {
    if (width >= 1024) setOpened(true);
    else setOpened(false);
  }, [width]);
  const handleExit = () => {
    // socket.emit("leave_room")
    router.push("/");
  };
  
  const handleShare = () => openModal(<ShareModal />);
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
    link.download = "canvas.png";
    link.click();
  };
  return (
    <>
        <motion.button
        className="btn-icon absolute bottom-1/2 -left-2 z-50 h-10 w-10 rounded-full bg-black text-2xl transition-none lg:hidden"
        animate={{ rotate: opened ? 0 : 180 }}
        transition={{ duration: 0.2, ease: DEFAULT_EASE }}
        onClick={() => setOpened(!opened)}
      >
        <FiChevronRight />
      </motion.button>
      <motion.div
        className="absolute left-10 top-[50%] z-50 grid grid-cols-2 items-center gap-5 rounded-lg bg-zinc-900 p-5 text-white 2xl:grid-cols-1"
        animate={{
          x: opened ? 0 : -160,
          y: "-50%",
        }}
        transition={{
          duration: 0.2,
          ease: DEFAULT_EASE,
        }}
      >
        <HistoryBtns />

        <div className="h-px w-full bg-white 2xl:hidden" />
        <div className="h-px w-full bg-white" />

        <ShapeSelector />
        <ColorPicker />
        <LineWidthPicker />
        <ModePicker />
        <ImagePicker />

        <div className="2xl:hidden"></div>
        <div className="h-px w-full bg-white 2xl:hidden" />
        <div className="h-px w-full bg-white" />

        <BackgroundPicker />
        <button className="btn-icon text-2xl" onClick={handleShare}>
          <IoIosShareAlt />
        </button>
        <button className="btn-icon text-2xl" onClick={handleDownload}>
          <BsDownload />
        </button>
        <button className="btn-icon text-xl" onClick={handleExit}>
          <ImExit />
        </button>
      </motion.div>
    </>
  );
};

export default ToolBar;
