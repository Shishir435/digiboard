import { useRecoilValue, useSetRecoilState } from "recoil";

import { canvasBackgroundAtom } from "./canvasBackground.atom";

export const useBackground = () => {
  const bg = useRecoilValue(canvasBackgroundAtom);
  return bg;
};

export const useSetBackground = () => {
  const setBg = useSetRecoilState(canvasBackgroundAtom);
  return setBg;
};
