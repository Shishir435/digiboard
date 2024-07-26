"use client";

import ColorPicker from "./ColorPicker";
import ImagePicker from "./ImagePicker";
import LineWidthPicker from "./LineWidthPicker";
import ModePicker from "./ModePicker";
import ShapeSelector from "./ShapeSelector";

const ToolBar = () => {
  return (
    <div
      style={{ translate: "-50%" }}
      className="absolute top-5 left-[60%] md:left-1/2 z-[30] flex items-center gap-4 rounded-lg bg-toolbar px-4 py-2 text-toolbar-foreground shadow-md"
    >
      <ShapeSelector />
      <ColorPicker />
      <LineWidthPicker />
      <ModePicker />
      <ImagePicker />
    </div>
  );
};

export default ToolBar;
