"use client";
import { RefObject, useEffect } from "react";

import { motion } from "framer-motion";

import {
  CANVAS_BACKGROUND_DARK,
  CANVAS_BACKGROUND_LIGHT,
  CANVAS_SIZE,
} from "@/common/constants/canvas";
import { useBackground } from "@/common/recoil/canvasBackground";

import { useSettingsValue } from "@/common/recoil/settings";
import { useBoardPosition } from "../../hooks/useBoardPosition";

const Background = ({ bgRef }: { bgRef: RefObject<HTMLCanvasElement> }) => {
  const bg = useBackground();
  const { x, y } = useBoardPosition();
  const settings = useSettingsValue();

  useEffect(() => {
    const ctx = bgRef.current?.getContext("2d");
    const backgroundColor =
      bg.mode === "dark"
        ? CANVAS_BACKGROUND_DARK[bg.canvasBg]
        : CANVAS_BACKGROUND_LIGHT[bg.canvasBg];
    if (ctx) {
      // canvas backgroundColor
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
      document.body.style.backgroundColor = backgroundColor;
      if (settings.showLines) {
        ctx.lineWidth = 1;
        // line color
        ctx.strokeStyle = bg.mode === "dark" ? "#444" : "#ddd";
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
    }
  }, [bgRef, bg, settings.showLines]);
  return (
    <motion.canvas
      ref={bgRef}
      width={CANVAS_SIZE.width}
      height={CANVAS_SIZE.height}
      className="absolute top-0"
      style={{ x, y }}
    />
  );
};

export default Background;
