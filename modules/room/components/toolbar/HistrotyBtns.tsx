"use client";
import TooltipContainer from "@/common/components/ui/tooltip";
import { useMyMoves } from "@/common/recoil/rooms";
import { useSavedMoves } from "@/common/recoil/savedMoves";
import { ResetIcon } from "@radix-ui/react-icons";
import { useRefs } from "../../hooks/useRefs";
import { Button } from "@/common/components/ui/button";

const HistoryBtns = () => {
  const { redoRef, undoRef } = useRefs();
  const { myMoves } = useMyMoves();
  const savedMoves = useSavedMoves();
  return (
    <div className="bg-toolbar rounded-md text-toolbar-foreground flex gap-2">
      <TooltipContainer
        trigger={
          <Button
            size="icon"
            variant="ghost"
            className="disabled:opacity-25 px-2"
            ref={redoRef}
            disabled={!savedMoves.length}
          >
            <ResetIcon className="rotate-180" />
          </Button>
        }
        hoverText="Redo"
      />

      <TooltipContainer
        trigger={
          <Button
            size="icon"
            variant="ghost"
            className="disabled:opacity-25 px-2"
            ref={undoRef}
            disabled={!myMoves.length}
          >
            <ResetIcon />
          </Button>
        }
        hoverText="Undo"
      />
    </div>
  );
};

export default HistoryBtns;
