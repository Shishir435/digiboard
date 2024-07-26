"use client";

import ColorPicker from "./ColorPicker";
import ImagePicker from "./ImagePicker";
import LineWidthPicker from "./LineWidthPicker";
import ModePicker from "./ModePicker";
import ShapeSelector from "./ShapeSelector";

const ToolBar = () => {
  return (
    <div
      // style={{ translate: "-50%" }}
      className="flex items-center gap-2 rounded-lg bg-toolbar px-2 py-1 text-toolbar-foreground shadow"
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
