"use client";
import { useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";

import { useOptions } from "@/common/recoil/options";

import { Button } from "@/common/components/ui/button";
import { BorderSolidIcon, CircleIcon, SquareIcon } from "@radix-ui/react-icons";
import { EntryAnimation } from "../../animations/colorPicker.animations";

const ShapeSelector = () => {
  const [options, setOptions] = useOptions();

  const ref = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  useClickAway(ref, () => setOpened(false));

  const handleShapeChange = (shape: Shape) => {
    setOptions((prev) => ({
      ...prev,
      shape,
    }));

    setOpened(false);
  };

  return (
    <div className="relative flex items-center" ref={ref}>
      <Button
        size="icon"
        variant="ghost"
        disabled={options.mode === "select"}
        onClick={() => setOpened((prev) => !prev)}
      >
        {options.shape === "circle" && <CircleIcon />}
        {options.shape === "rect" && <SquareIcon />}
        {options.shape === "line" && <BorderSolidIcon />}
      </Button>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute top-16 -left-10 z-10 flex gap-1 rounded-lg border bg-toolbar text-toolbar-foreground p-2 md:border-0"
            variants={EntryAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            <Button
              className="btn-icon text-2xl"
              onClick={() => handleShapeChange("line")}
            >
              <BorderSolidIcon />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="btn-icon text-2xl"
              onClick={() => handleShapeChange("rect")}
            >
              <SquareIcon />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="btn-icon text-2xl"
              onClick={() => handleShapeChange("circle")}
            >
              <CircleIcon />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShapeSelector;
