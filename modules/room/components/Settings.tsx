"use client";
import { Button } from "@/common/components/ui/button";
import { Card, CardContent, CardTitle } from "@/common/components/ui/card";
import { Switch } from "@/common/components/ui/switch";
import {
  CANVAS_BACKGROUND_DARK,
  CANVAS_BACKGROUND_LIGHT,
} from "@/common/constants/canvas";
import {
  useBackground,
  useSetBackground,
} from "@/common/recoil/canvasBackground";
import { useSetSettings, useSettingsValue } from "@/common/recoil/settings";

const Settings = () => {
  const { showChat, showMiniMap, showMousePosition, showLines } =
    useSettingsValue();
  const setSettings = useSetSettings();
  const bg = useBackground();
  const setBg = useSetBackground();
  const handleClick = (val: keyof CanvasBackgroundType) => {
    setBg((prev) => ({ ...prev, canvasBg: val }));
  };
  return (
    <Card className="px-8 py-4">
      <CardTitle className="text-center">Digiboard Settings</CardTitle>
      <CardContent className="flex flex-col gap-4 mt-8">
        <div className="flex gap-4 justify-between">
          <p>Show Chat</p>
          <Switch
            checked={showChat}
            onCheckedChange={() =>
              setSettings((prev) => ({ ...prev, showChat: !showChat }))
            }
          />
        </div>
        <div className="flex gap-4 justify-between">
          <p>Show MiniMap</p>
          <Switch
            checked={showMiniMap}
            onCheckedChange={() =>
              setSettings((prev) => ({ ...prev, showMiniMap: !showMiniMap }))
            }
          />
        </div>
        <div className="flex gap-4 justify-between">
          <p>Show MousePosition</p>
          <Switch
            checked={showMousePosition}
            onCheckedChange={() =>
              setSettings((prev) => ({
                ...prev,
                showMousePosition: !showMousePosition,
              }))
            }
          />
        </div>
        <div className="flex gap-4 justify-between">
          <p>Show Lines</p>
          <Switch
            checked={showLines}
            onCheckedChange={() =>
              setSettings((prev) => ({
                ...prev,
                showLines: !showLines,
              }))
            }
          />
        </div>
        <div className="flex gap-2 justify-between bg-black/25 p-2 rounded dark:bg-white/25">
          {bg.mode === "dark"
            ? Object.keys(CANVAS_BACKGROUND_DARK).map((val) => (
                <Button
                  key={val}
                  size="icon"
                  onClick={() => handleClick(val as keyof CanvasBackgroundType)}
                  title={
                    CANVAS_BACKGROUND_DARK[val as keyof CanvasBackgroundType]
                  }
                >
                  <div
                    className="h-9 w-9 rounded"
                    style={{
                      backgroundColor:
                        CANVAS_BACKGROUND_DARK[
                          val as keyof CanvasBackgroundType
                        ],
                    }}
                  />
                </Button>
              ))
            : Object.keys(CANVAS_BACKGROUND_LIGHT).map((val) => (
                <Button
                  key={val}
                  size="icon"
                  onClick={() => handleClick(val as keyof CanvasBackgroundType)}
                  title={
                    CANVAS_BACKGROUND_LIGHT[val as keyof CanvasBackgroundType]
                  }
                >
                  <div
                    className="h-9 w-9 rounded"
                    style={{
                      backgroundColor:
                        CANVAS_BACKGROUND_LIGHT[
                          val as keyof CanvasBackgroundType
                        ],
                    }}
                  />
                </Button>
              ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;
