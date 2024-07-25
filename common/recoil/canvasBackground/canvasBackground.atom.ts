import {
  CANVAS_BACKGROUND_DARK,
  CANVAS_BACKGROUND_LIGHT,
} from "@/common/constants/canvas";
import { atom } from "recoil";

export const canvasBackgroundAtom = atom<{
  mode: "dark" | "light";
  canvasBg:
    | keyof typeof CANVAS_BACKGROUND_DARK
    | keyof typeof CANVAS_BACKGROUND_LIGHT;
}>({
  key: "canvasBackground",
  default: {
    mode: "light",
    canvasBg: "bg-1",
  },
});
