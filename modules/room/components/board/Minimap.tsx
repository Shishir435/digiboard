import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useMotionValue, motion } from "framer-motion";
import { useViewPortSize } from "@/common/hooks/useViewPortSize";
import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { useBoardPosition } from "../../hooks/useBoardPosition";
interface MiniMapProps {
  dragging: boolean;
  setMovedMiniMap: Dispatch<SetStateAction<boolean>>;
}
const MiniMap = forwardRef<HTMLCanvasElement, MiniMapProps>(
  ({dragging, setMovedMiniMap }, ref) => {
    const {x,y}=useBoardPosition()
    const containerRef = useRef<HTMLDivElement>(null);
    const { height, width } = useViewPortSize();
    const miniX = useMotionValue(0);
    const miniY = useMotionValue(0);

    useEffect(() => {
      miniX.onChange((newX) => {
        if (!dragging) x.set(-newX * 7);
      });
      miniY.onChange((newY) => {
        if (!dragging) y.set(-newY * 7);
      });

      return () => {
        miniX.clearListeners();
        miniY.clearListeners();
      };
    }, [dragging, miniX, miniY, x, y]);

    return (
      <div
        className="absolute right-10 top-10 z-30 bg-zinc-50 overflow-hidden rounded-lg shadow-lg "
        ref={containerRef}
        style={{
          width: CANVAS_SIZE.width / 7,
          height: CANVAS_SIZE.height / 7,
        }}
      >
        <canvas
          ref={ref}
          width={CANVAS_SIZE.width}
          height={CANVAS_SIZE.height}
          className="h-full w-full"
        />
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0}
          dragTransition={{ power: 0, timeConstant: 0 }}
          onDragEnd={() => setMovedMiniMap((prev: boolean) => !prev)}
          onDragStart={() => setMovedMiniMap((prev: boolean) => !prev)}
          className="absolute top-0 right-0 cursor-grab rounded-lg border-2 border-red-500"
          style={{ width: width / 7, height: height / 7, x: miniX, y: miniY }}
          animate={{ x: -x.get() / 7, y: -y.get() / 7 }}
          transition={{ duration: 0 }}
        ></motion.div>
      </div>
    );
  }
);

MiniMap.displayName = "MiniMap";

export default MiniMap;
