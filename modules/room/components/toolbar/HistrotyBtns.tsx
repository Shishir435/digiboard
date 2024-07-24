"use client";
import { FaRedo, FaUndo } from "react-icons/fa";
import { useRefs } from "../../hooks/useRefs";
import { useMyMoves } from "@/common/recoil/rooms";
import { useSavedMoves } from "@/common/recoil/savedMoves";

const HistoryBtns = () => {
  const { redoRef, undoRef } = useRefs();
  const { myMoves } = useMyMoves();
  const savedMoves = useSavedMoves();
  return (
    <>
      <button
        className="btn-icon text-xl disabled:opacity-25"
        ref={redoRef}
        disabled={!savedMoves.length}
      >
        <FaRedo />
      </button>
      <button
        className="btn-icon text-xl disabled:opacity-25"
        ref={undoRef}
        disabled={!myMoves.length}
      >
        <FaUndo />
      </button>
    </>
  );
};

export default HistoryBtns;
