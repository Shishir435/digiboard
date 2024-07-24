import { atom } from "recoil";

export const settingsAtom = atom<{
  showMiniMap: boolean;
  showChat: boolean;
  showMousePosition: boolean;
}>({
  key: "settings",
  default: {
    showChat: true,
    showMiniMap: false,
    showMousePosition: false,
  },
});
