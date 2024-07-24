import { useRecoilValue, useSetRecoilState } from "recoil";
import { settingsAtom } from "./settings.atom";

const useSettingsValue = () => {
  const settingsValue = useRecoilValue(settingsAtom);
  return settingsValue;
};

const useSetSettings = () => {
  const setSettings = useSetRecoilState(settingsAtom);
  return setSettings;
};

export { useSettingsValue, useSetSettings };
