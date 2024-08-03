import { atom } from "recoil";

export const optionsAtom = atom<CtxOptions>({
  key: "options",
  default: {
    lineColor: { h: 0, s: 0, l: 0, a: 1 },
    fillColor: { h: 0, s: 0, l: 0, a: 0 },
    lineWidth: 5,
    mode: "draw",
    shape: "line",
    selection: null,
  },
});
