import { atom } from "recoil";

export const settingsAtom = atom<{
  showMiniMap: boolean;
  showChat: boolean;
  showMousePosition: boolean;
  showLines: boolean;
}>({
  key: "settings",
  default: {
    showChat: true,
    showMiniMap: false,
    showMousePosition: false,
    showLines: false,
  },
});
