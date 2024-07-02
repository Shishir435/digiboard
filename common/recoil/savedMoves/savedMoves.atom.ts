import { atom } from "recoil";


export const savedMovesAtom=atom<Move[]>({
    key: "savedMoves",
    default: []
})