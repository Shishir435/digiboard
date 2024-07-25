import { atom } from "recoil";

export const canvasBackgroundAtom = atom<{
  mode: "dark" | "light";
  canvasBg: keyof CanvasBackgroundType;
}>({
  key: "canvasBackground",
  default: {
    mode: "light",
    canvasBg: "bg-1",
  },
});
