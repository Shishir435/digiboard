import { useRecoilValue, useSetRecoilState } from "recoil";
import { contextMenuAtom } from "./contextMenu.atom";

const useContextMenuValue = () => {
  const contextMenu = useRecoilValue(contextMenuAtom);
  return contextMenu;
};

const useSetContextMenu = () => {
  const setContextMenu = useSetRecoilState(contextMenuAtom);
  return setContextMenu;
};

export { useContextMenuValue, useSetContextMenu };
