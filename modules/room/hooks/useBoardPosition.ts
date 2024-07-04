import { useContext } from "react";

import { roomContext } from "../context/room.context";

export const useBoardPosition = () => {
  const { x, y } = useContext(roomContext);

  return { x, y };
};
