import { HslaColor } from "react-colorful";

export const getStringFromHsla = (hsla: HslaColor) =>
  `hsla(${hsla.h},${hsla.s}%,${hsla.l}%,${hsla.a})`;
