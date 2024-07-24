"use client";
import React, { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/common/components/ui/card";
import {
  useContextMenuValue,
  useSetContextMenu,
} from "@/common/recoil/contextMenu";
import ShareButton from "@/modules/room/components/toolbar/ShareButton";
import ExitButton from "@/modules/room/components/toolbar/ExitButton";
import SettingsButton from "@/modules/room/components/toolbar/SettingsButton";

const ContextMenu = () => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const { opened } = useContextMenuValue();
  const setContextMenu = useSetContextMenu();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useClickAway(contextMenuRef, () => setContextMenu({ opened: false }));

  useEffect(() => {
    const handleContext = (e: MouseEvent) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setContextMenu({ opened: true });
    };

    document.addEventListener("contextmenu", handleContext);

    return () => {
      document.removeEventListener("contextmenu", handleContext);
    };
  }, [setContextMenu]);

  return (
    opened && (
      <Card
        ref={contextMenuRef}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        className="absolute z-[60] w-60"
      >
        <CardHeader>Custom Context Menu</CardHeader>
        <CardDescription>
          <button onClick={() => setContextMenu({ opened: false })}>
            Close
          </button>
        </CardDescription>
        <CardFooter className="flex items-center gap-2">
          <ShareButton />
          <ExitButton />
          <SettingsButton />
        </CardFooter>
      </Card>
    )
  );
};

export default ContextMenu;
