"use client";

import { useOptionsValue } from "@/common/recoil/options";

import { CopyIcon, Cross1Icon, MoveIcon } from "@radix-ui/react-icons";
import { useRefs } from "../../hooks/useRefs";

const SelectionBtns = () => {
  const { selection } = useOptionsValue();
  const { selectionRefs } = useRefs();

  let top;
  let left;

  if (selection) {
    const { x, y, width, height } = selection;
    top = Math.min(y, y + height) - 40;
    left = Math.min(x, x + width);
  } else {
    left = -40;
    top = -40;
  }

  return (
    <div
      className="absolute top-0 left-0 z-50 flex items-center justify-center gap-2"
      style={{ top, left }}
    >
      <button
        className="rounded-full bg-gray-200 p-2"
        ref={(ref) => {
          if (ref && selectionRefs.current) selectionRefs.current[0] = ref;
        }}
        title="Click to move"
      >
        <MoveIcon />
      </button>
      <button
        className="rounded-full bg-gray-200 p-2"
        ref={(ref) => {
          if (ref && selectionRefs.current) selectionRefs.current[1] = ref;
        }}
        title="Copy selected Item"
      >
        <CopyIcon />
      </button>
      <button
        className="rounded-full bg-gray-200 p-2"
        ref={(ref) => {
          if (ref && selectionRefs.current) selectionRefs.current[2] = ref;
        }}
        title="delete selected Item"
      >
        <Cross1Icon />
      </button>
    </div>
  );
};

export default SelectionBtns;
