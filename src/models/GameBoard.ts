//In backend this is called GameState since state would emply this being a 'useState' which it isn't.

import type {GameBoardCellContent} from "./GameBoardCellContent.ts";

export type GameBoard={
    board: GameBoardCellContent[][],
    atTurn: string
};