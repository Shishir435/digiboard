"use client";

import ColorPicker from "./ColorPicker";
import DownloadButton from "./DownloadButton";
import ExitButton from "./ExitButton";
import ImagePicker from "./ImagePicker";
import LineWidthPicker from "./LineWidthPicker";
import ModePicker from "./ModePicker";
import ShapeSelector from "./ShapeSelector";
import ShareButton from "./ShareButton";

const ToolBar = () => {
  return (
    <div
      style={{ translate: "-50%" }}
      className="absolute top-5 left-1/2 z-[30] flex items-center gap-4 rounded-lg bg-toolbar px-4 py-2 text-toolbar-foreground shadow-lg"
    >
      <ShapeSelector />
      <ColorPicker />
      <LineWidthPicker />
      <ModePicker />
      <ImagePicker />
      <div className="w-px h-5 bg-gray-500" />
      <ShareButton />
      <DownloadButton />
      <ExitButton />
    </div>
  );
};

export default ToolBar;
