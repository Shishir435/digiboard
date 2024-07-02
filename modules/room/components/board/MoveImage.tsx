/* eslint-disable @next/next/no-img-element */
import { motion, useMotionValue } from "framer-motion";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import { getPos } from "@/common/lib/getPos";
import { socket } from "@/common/lib/socket";

import { useBoardPosition } from "../../hooks/useBoardPosition";
import { useMoveImage } from "../../hooks/useMoveImage";
import { useRefs } from "../../hooks/useRefs";

const MoveImage = () => {
  const { canvasRef } = useRefs();
  const { x, y } = useBoardPosition();
  const { moveImage, setMoveImage } = useMoveImage();

  const imageX = useMotionValue(50);
  const imageY = useMotionValue(50);

  const handlePlaceImage = () => {
    const [finalX, finalY] = [getPos(imageX.get(), x), getPos(imageY.get(), y)];

    const move: Move = {
      width: 0,
      height: 0,
      radius: 0,
      path: [[finalX,finalY]],
      options: {
       lineWidth: 1,
       lineColor: "#000",
       erase: false,
       shape: 'image'
      },
      timestamps: 0,
      eraser: false,
      base64: moveImage,
    };

    socket.emit("draw", move);

    setMoveImage("");
    imageX.set(50);
    imageY.set(50);
  };

  if (!moveImage) return null;

  return (
    <motion.div
      drag
      dragConstraints={canvasRef}
      dragElastic={0}
      dragTransition={{ power: 0.03, timeConstant: 50 }}
      className="absolute top-0 z-20 cursor-grab"
      style={{ x: imageX, y: imageY }}
    >
      <div className="absolute bottom-full mb-2 flex gap-3">
        <button
          className="rounded-full bg-gray-200 p-2"
          onClick={handlePlaceImage}
        >
          <AiOutlineCheck />
        </button>
        <button
          className="rounded-full bg-gray-200 p-2"
          onClick={() => setMoveImage("")}
        >
          <AiOutlineClose />
        </button>
      </div>
      <img
        className="pointer-events-none"
        alt="image to place"
        src={moveImage}
      />
    </motion.div>
  );
};

export default MoveImage;