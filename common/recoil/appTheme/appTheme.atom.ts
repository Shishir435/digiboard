import { getInitialTheme } from "@/common/constants/theme";
import { atom } from "recoil";

export const appThemeAtom = atom<"dark" | "light" | "system">({
  key: "theme",
  default: getInitialTheme(),
});
