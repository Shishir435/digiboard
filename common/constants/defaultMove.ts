export const DEFAULT_MOVE: Move = {
  circle: {
    cX: 0,
    cY: 0,
    radiusX: 0,
    radiusY: 0,
  },
  rect: {
    width: 0,
    height: 0,
  },
  path: [],
  options: {
    shape: "line",
    mode: "draw",
    lineWidth: 1,
    lineColor: { h: 0, s: 0, l: 0, a: 0 },
    fillColor: { h: 0, s: 0, l: 0, a: 0 },
    selection: null,
  },
  id: "",
  img: {
    base64: "",
  },
  timestamp: 0,
};
