"use client";
import { AiOutlineClose } from "react-icons/ai";
import {
  useBackground,
  useSetBackground,
} from "@/common/recoil/canvasBackground";
import { useModal } from "@/common/recoil/modals";
import { useSettingsValue } from "@/common/recoil/settings";

const BackgroundModal = () => {
  const { closeModal } = useModal();
  const setBackground = useSetBackground();
  const bg = useBackground();
  const settings = useSettingsValue();
  const renderBg = (ref: HTMLCanvasElement | null, mode: "dark" | "light") => {
    const ctx = ref?.getContext("2d");
    if (ctx) {
      ctx.fillStyle = mode === "dark" ? "#222" : "#fff";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      if (settings.showLines) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = mode === "dark" ? "#444" : "#ddd";
        for (let i = 0; i < ctx.canvas.height; i += 10) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(ctx.canvas.width, i);
          ctx.stroke();
        }

        for (let i = 0; i < ctx.canvas.width; i += 10) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, ctx.canvas.height);
          ctx.stroke();
        }
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center rounded-md bg-toolbar text-toolbar-foreground p-10">
      <button onClick={closeModal} className="absolute top-5 right-5">
        <AiOutlineClose />
      </button>
      <h2 className="mb-4 text-2xl font-bold">Choose background</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <canvas
          className="h-48 w-64 cursor-pointer rounded-md border-2"
          tabIndex={0}
          width={256}
          height={192}
          onClick={() => setBackground("dark", "bg-1")}
          ref={(ref) => renderBg(ref, "dark")}
        />
        <canvas
          className="h-48 w-64 cursor-pointer rounded-md border-2"
          tabIndex={0}
          width={256}
          height={192}
          onClick={() => setBackground("light", "bg-1")}
          ref={(ref) => renderBg(ref, "light")}
        />
        <canvas
          className="h-48 w-64 cursor-pointer rounded-md border-2"
          tabIndex={0}
          width={256}
          height={192}
          onClick={() => setBackground("dark", "bg-1")}
          ref={(ref) => renderBg(ref, "dark")}
        />
        <canvas
          className="h-48 w-64 cursor-pointer rounded-md border-2"
          tabIndex={0}
          width={256}
          height={192}
          onClick={() => setBackground("light", "bg-1")}
          ref={(ref) => renderBg(ref, "light")}
        />
      </div>
    </div>
  );
};

export default BackgroundModal;
