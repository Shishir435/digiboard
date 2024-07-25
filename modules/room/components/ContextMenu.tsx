"use client";
import {
  useContextMenuValue,
  useSetContextMenu,
} from "@/common/recoil/contextMenu";
import ExitButton from "@/modules/room/components/toolbar/ExitButton";
import SettingsButton from "@/modules/room/components/toolbar/SettingsButton";
import ShareButton from "@/modules/room/components/toolbar/ShareButton";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import DownloadButton from "./toolbar/DownloadButton";

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
      <div
        ref={contextMenuRef}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        className="absolute z-[60] py-2 h-12"
      >
        <div className="fexl justify-center items-center bg-toolbar text-toolbar-foreground rounded-sm px-4 py-2 shadow-md">
          <div className="flex items-center gap-2 justify-between w-full">
            <ShareButton />
            <ExitButton />
            <SettingsButton />
            <DownloadButton />
          </div>
        </div>
      </div>
    )
  );
};

export default ContextMenu;
