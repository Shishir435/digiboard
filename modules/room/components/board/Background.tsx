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

    if (ctx) {
      ctx.fillStyle = bg.mode === "dark" ? "#222" : "#fff";
      ctx.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

      if (bg.mode === "dark") {
        document.body.style.backgroundColor =
          CANVAS_BACKGROUND_DARK[bg.canvasBg];
      } else if (bg.mode === "light") {
        document.body.style.backgroundColor =
          CANVAS_BACKGROUND_LIGHT[bg.canvasBg];
      }

      if (settings.showLines) {
        ctx.lineWidth = 1;
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
      className="absolute top-0 bg-zinc-100"
      style={{ x, y }}
    />
  );
};

export default Background;
