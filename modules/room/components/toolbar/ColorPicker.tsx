"use client";
import { useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { RgbaColorPicker } from "react-colorful";
import { useClickAway } from "react-use";

import { useOptions } from "@/common/recoil/options/options.hook";

import { Button } from "@/common/components/ui/button";
import { ColorWheelIcon } from "@radix-ui/react-icons";
import { EntryAnimation } from "../../animations/colorPicker.animations";

const ColorPicker = () => {
  const [options, setOptions] = useOptions();

  const ref = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  useClickAway(ref, () => setOpened(false));

  return (
    <div className="relative flex" ref={ref}>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setOpened(!opened)}
        disabled={options.mode === "select"}
        title="Color Picker"
      >
        <ColorWheelIcon />
      </Button>
      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute z-[50] top-5 -left-12  mt-10 md:mt-4 sm:top-14 md:flex gap-8"
            variants={EntryAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            <div>
              <h2 className="font-semibold text-black dark:text-white">
                Line color
              </h2>
              <RgbaColorPicker
                color={options.lineColor}
                onChange={(e) => {
                  setOptions({
                    ...options,
                    lineColor: e,
                  });
                }}
              />
            </div>
            <div>
              <h2 className="font-semibold text-black dark:text-white">
                Fill color
              </h2>
              <RgbaColorPicker
                color={options.fillColor}
                onChange={(e) => {
                  setOptions({
                    ...options,
                    fillColor: e,
                  });
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
