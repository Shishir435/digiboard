import { useContext } from "react";

import { roomContext } from "../context/room.context";

export const useMoveImage = () => {
  const { moveImage, setMoveImage } = useContext(roomContext);

  return { moveImage, setMoveImage };
};
