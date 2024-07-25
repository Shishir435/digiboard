"use client";

import ColorPicker from "./ColorPicker";

import BackgroundPicker from "./BackgroundPicker";
import DownloadButton from "./DownloadButton";
import ExitButton from "./ExitButton";
import HistoryBtns from "./HistrotyBtns";
import ImagePicker from "./ImagePicker";
import LineWidthPicker from "./LineWidthPicker";
import ModePicker from "./ModePicker";
import SettingsButton from "./SettingsButton";
import ShapeSelector from "./ShapeSelector";
import ShareButton from "./ShareButton";

const ToolBar = () => {
  return (
    <div
      style={{ translate: "-50%" }}
      className="absolute top-5 left-1/2 z-50 flex items-center gap-4 rounded-lg bg-toolbar px-4 py-2 text-white shadow-lg"
    >
      <HistoryBtns />

      {/* <div className="h-px w-full bg-white 2xl:hidden" /> */}
      <div className="w-px h-5 bg-gray-500" />

      <ShapeSelector />
      <ColorPicker />
      <LineWidthPicker />
      <ModePicker />
      <ImagePicker />

      {/* <div className="2xl:hidden"></div> */}
      {/* <div className="h-px w-full bg-white 2xl:hidden" /> */}
      <div className="w-px h-5 bg-gray-500" />

      <BackgroundPicker />
      <ShareButton />
      <DownloadButton />
      <ExitButton />
      <SettingsButton />
    </div>
  );
};

export default ToolBar;
