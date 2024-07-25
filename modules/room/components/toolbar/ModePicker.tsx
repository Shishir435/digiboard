"use client";
import { useEffect } from "react";

import { EraserIcon, Pencil1Icon, SectionIcon } from "@radix-ui/react-icons";

import { Button } from "@/common/components/ui/button";
import { useOptions, useSetSelection } from "@/common/recoil/options";

const ModePicker = () => {
  const [options, setOptions] = useOptions();
  const { clearSelection } = useSetSelection();

  useEffect(() => {
    clearSelection();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.mode]);

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className={`btn-icon text-xl ${
          options.mode === "draw" && "bg-green-400"
        }`}
        onClick={() => {
          setOptions((prev) => ({
            ...prev,
            mode: "draw",
          }));
        }}
      >
        <Pencil1Icon />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className={`btn-icon text-xl ${
          options.mode === "eraser" && "bg-green-400"
        }`}
        onClick={() => {
          setOptions((prev) => ({
            ...prev,
            mode: "eraser",
          }));
        }}
      >
        <EraserIcon />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className={`${options.mode === "select" && "bg-green-400"}`}
        onClick={() => {
          setOptions((prev) => ({
            ...prev,
            mode: "select",
          }));
        }}
      >
        <SectionIcon />
      </Button>
    </>
  );
};

export default ModePicker;
