import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { useViewPortSize } from "@/common/hooks/useViewPortSize";
import { socket } from "@/common/lib/socket";
import { useBoardPosition } from "@/modules/room/hooks/useBoardPosition";
import { useDraw } from "@/modules/room/hooks/useDraw";
import { useSocketDraw } from "@/modules/room/hooks/useSocketDraw";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsArrowsMove } from "react-icons/bs";
import { useCtx } from "../../hooks/useCtx";
import { useMovesHandlers } from "../../hooks/useMovesHandlers";
import { useRefs } from "../../hooks/useRefs";
import Background from "./Background";
import MiniMap from "./Minimap";

const Canvas = () => {
  const { undoRef, redoRef, canvasRef, bgRef } = useRefs();
  const [dragging, setDragging] = useState(true);
  const ctx=useCtx()
  const { width, height } = useViewPortSize();
  const { x, y } = useBoardPosition();
  
  const { handleDraw, handleEndDrawing, handleStartDrawing, drawing,clearOnYourMove } =
  useDraw(dragging);
  const { handleUndo, handleRedo } = useMovesHandlers(clearOnYourMove);
  useEffect(()=>{
    setDragging(false)
  },[])
  useEffect(() => {
  
    const handleKey=(e:KeyboardEvent)=>{
      setDragging(e.ctrlKey)
    }
    window.addEventListener("keyup", handleKey);
    window.addEventListener("keydown", handleKey);
    const undoBtn = undoRef.current;
    const redoBtn = redoRef.current;
    undoBtn?.addEventListener("click", handleUndo);
    redoBtn?.addEventListener("click", handleRedo);
    return () => {
      undoBtn?.removeEventListener("click", handleUndo);
      redoBtn?.removeEventListener("click", handleRedo);
      window.removeEventListener("keyup", handleKey);
      window.removeEventListener("keydown", handleKey);
    };
  }, [dragging, undoRef,redoRef,handleRedo, handleUndo, canvasRef]);
  
  useSocketDraw(drawing);

  useEffect(() => {
    if (ctx) {
      socket.emit("joined_room");
    }
  }, [ctx]);
  return (
    <div className="relative h-full w-full overflow-hidden ">
      <motion.canvas
        ref={canvasRef}
        width={CANVAS_SIZE.width}
        height={CANVAS_SIZE.height}
        className={`absolute top-0 z-10 ${dragging && "cursor-move"}`}
        style={{ x, y }}
        drag={dragging}
        dragConstraints={{
          left: -(CANVAS_SIZE.width - width),
          right: 0,
          top: -(CANVAS_SIZE.height - height),
          bottom: 0,
        }}
        dragElastic={0}
        dragTransition={{ power: 0, timeConstant: 0 }}
        onMouseDown={(e) => handleStartDrawing(e.clientX, e.clientY)}
        onMouseUp={handleEndDrawing}
        onMouseMove={(e) => handleDraw(e.clientX, e.clientY, e.shiftKey)}
        onTouchStart={(e) =>
          handleStartDrawing(e.touches[0].clientX, e.touches[0].clientY)
        }
        onTouchEnd={handleEndDrawing}
        onTouchMove={(e) =>
          handleDraw(e.touches[0].clientX, e.touches[0].clientY)
        }
      />
      <Background bgRef={bgRef} />
      <MiniMap dragging={dragging}/>
      <button
        className={`absolute bottom-14 right-5 z-10 rounded-xl md:bottom-5 ${
          dragging ? "bg-green-500" : "bg-zinc-300 text-black"
        } p-3 text-lg text-white`}
        onClick={() => setDragging((prev) => !prev)}
      >
        <BsArrowsMove />
      </button>
    </div>
  );
};

export default Canvas;
