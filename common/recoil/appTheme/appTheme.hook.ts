import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useRecoilState, useSetRecoilState } from "recoil";
import { appThemeAtom } from "./appTheme.atom";
import canvasBackgroundAtom from "../canvasBackground";
import { getInitialTheme } from "@/common/constants/theme";

export const useHandleAppTheme = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [appTheme, setAppTheme] = useRecoilState(appThemeAtom);
  const setCanvasBackground = useSetRecoilState(canvasBackgroundAtom);

  useEffect(() => {
    const storedTheme = getInitialTheme();
    const initialTheme = storedTheme || "light";
    setTheme(initialTheme);
    setAppTheme(initialTheme);
    if (initialTheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const systemTheme = mediaQuery.matches ? "dark" : "light";
      setCanvasBackground((prev) => ({ ...prev, mode: systemTheme }));
    } else {
      setCanvasBackground((prev) => ({ ...prev, mode: initialTheme }));
    }
    const handleThemeChange = (newTheme: "dark" | "light" | "system") => {
      setAppTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      if (newTheme === "system") {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        setCanvasBackground((prev) => ({ ...prev, mode: systemTheme }));
      } else {
        setCanvasBackground((prev) => ({ ...prev, mode: newTheme }));
      }
    };

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const systemTheme = mediaQuery.matches ? "dark" : "light";
      setCanvasBackground((prev) => ({ ...prev, mode: systemTheme }));

      const mediaQueryListener = (e: MediaQueryListEvent) => {
        const newSystemTheme = e.matches ? "dark" : "light";
        handleThemeChange(newSystemTheme);
      };

      mediaQuery.addEventListener("change", mediaQueryListener);
      return () => mediaQuery.removeEventListener("change", mediaQueryListener);
    } else {
      handleThemeChange(resolvedTheme as "dark" | "light");
    }
  }, [theme, resolvedTheme, setTheme, setAppTheme, setCanvasBackground]);

  return { appTheme, setTheme };
};
