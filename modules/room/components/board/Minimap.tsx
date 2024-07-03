import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { useViewPortSize } from "@/common/hooks/useViewPortSize";
import { motion, useMotionValue } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useBoardPosition } from "../../hooks/useBoardPosition";
import { useRefs } from "../../hooks/useRefs";
interface MiniMapProps {
  dragging: boolean;
  setMovedMiniMap: Dispatch<SetStateAction<boolean>>;
}
const MiniMap=({dragging, setMovedMiniMap }:MiniMapProps) => {
    const boardPos = useBoardPosition();
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const {miniMapRef}=useRefs()
    const { height, width } = useViewPortSize();
    const miniX = useMotionValue(0);
    const miniY = useMotionValue(0);

    useEffect(() => {
        const unsubscribe = boardPos.x.onChange(setX);
        return unsubscribe;
    }, [boardPos.x]);
  
    useEffect(() => {
        const unsubscribe = boardPos.y.onChange(setY);
        return unsubscribe;
    }, [boardPos.y])

    const divider = useMemo(() => {
      if (width > 1600) return 7;
      if (width > 1000) return 10;
      if (width > 600) return 14;
      return 20;
    }, [width]);
  
    useEffect(() => {
      miniX.onChange((newX) => {
        if (!dragging) boardPos.x.set(Math.floor(-newX * divider));
      });
      miniY.onChange((newY) => {
        if (!dragging) boardPos.y.set(Math.floor(-newY * divider));
      });
  
      return () => {
        miniX.clearListeners();
        miniY.clearListeners();
      };
    }, [boardPos.x, boardPos.y, divider, dragging, miniX, miniY]);
  

    return (
      <div
        className="absolute right-10 top-10 z-30 overflow-hidden rounded-lg shadow-lg "
        ref={containerRef}
        style={{
          width: CANVAS_SIZE.width / divider,
          height: CANVAS_SIZE.height / divider,
        }}
      >
        <canvas
          ref={miniMapRef}
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
          animate={{ x: -x / divider, y: -y/divider }}
          transition={{ duration: 0 }}
        ></motion.div>
      </div>
    );
  };

export default MiniMap;
