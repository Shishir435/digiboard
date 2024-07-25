import { atom } from "recoil";

export const contextMenuAtom = atom<{ opened: boolean }>({
  key: "contextMenu",
  default: {
    opened: false,
  },
});
