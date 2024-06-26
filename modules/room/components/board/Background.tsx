import { RefObject, useEffect, useRef } from "react";

import { motion } from "framer-motion";

import { CANVAS_SIZE } from "@/common/constants/canvasSize";

import { useBoardPosition } from "../../hooks/useBoardPosition";

const Background = () => {
  const { x, y } = useBoardPosition();
  const bgRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = bgRef.current?.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

      document.body.style.backgroundColor = "#fff";

      ctx.lineWidth = 1;
      ctx.strokeStyle = "#ddd";
      for (let i = 0; i < CANVAS_SIZE.height; i += 25) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(ctx.canvas.width, i);
        ctx.stroke();
      }

      for (let i = 0; i < CANVAS_SIZE.width; i += 25) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, ctx.canvas.height);
        ctx.stroke();
      }
    }
  }, []);

  return (
    <motion.canvas
      ref={bgRef}
      width={CANVAS_SIZE.width}
      height={CANVAS_SIZE.height}
      className="absolute top-0 bg-zinc-100"
      style={{ x, y }}
    />
  );
};

export default Background;
