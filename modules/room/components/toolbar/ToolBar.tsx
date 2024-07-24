"use client";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

import { DEFAULT_EASE } from "@/common/constants/easings";
import ColorPicker from "./ColorPicker";

import { useViewPortSize } from "@/common/hooks/useViewPortSize";
import BackgroundPicker from "./BackgroundPicker";
import DownloadButton from "./DownloadButton";
import ExitButton from "./ExitButton";
import HistoryBtns from "./HistrotyBtns";
import ImagePicker from "./ImagePicker";
import LineWidthPicker from "./LineWidthPicker";
import ModePicker from "./ModePicker";
import ShapeSelector from "./ShapeSelector";
import ShareButton from "./ShareButton";
import SettingsButton from "./SettingsButton";

const ToolBar = () => {
  const { width } = useViewPortSize();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (width >= 1024) setOpened(true);
    else setOpened(false);
  }, [width]);

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
        <ShareButton />
        <DownloadButton />
        <ExitButton />
        <SettingsButton />
      </motion.div>
    </>
  );
};

export default ToolBar;
