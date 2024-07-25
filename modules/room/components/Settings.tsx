"use client";
import { Card, CardContent, CardTitle } from "@/common/components/ui/card";
import { Switch } from "@/common/components/ui/switch";
import { useSetSettings, useSettingsValue } from "@/common/recoil/settings";
import React from "react";

const Settings = () => {
  const { showChat, showMiniMap, showMousePosition, showLines } =
    useSettingsValue();
  const setSettings = useSetSettings();

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
      </CardContent>
    </Card>
  );
};

export default Settings;
