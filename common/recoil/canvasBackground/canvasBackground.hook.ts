import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  CANVAS_BACKGROUND_DARK,
  CANVAS_BACKGROUND_LIGHT,
} from "@/common/constants/canvas";
import { canvasBackgroundAtom } from "./canvasBackground.atom";

export const useBackground = () => {
  const bg = useRecoilValue(canvasBackgroundAtom);
  return bg;
};

export const useSetBackground = () => {
  const setBg = useSetRecoilState(canvasBackgroundAtom);

  const setBackground = (
    mode: "dark" | "light",
    canvasBg:
      | keyof typeof CANVAS_BACKGROUND_DARK
      | keyof typeof CANVAS_BACKGROUND_LIGHT
  ) => {
    setBg({
      mode,
      canvasBg,
    });
  };

  return setBackground;
};
