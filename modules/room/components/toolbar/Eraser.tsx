"use client";
import { useOptions } from "@/common/recoil/options";
import React from "react";
import { FaEraser } from "react-icons/fa";
const Eraser = () => {
  const [options, setOptions] = useOptions();

  return (
    <button
      className={`text-xl ${options.mode === "eraser" && "bg-green-500"}`}
      onClick={() =>
        setOptions((prev) => ({
          ...prev,
          mode: prev.mode === "draw" ? "eraser" : "draw",
        }))
      }
    >
      <FaEraser />
    </button>
  );
};

export default Eraser;
