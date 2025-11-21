import type {GameBoard} from "../models/GameBoard.ts";

export function useGameBoard() {
    //For now its hard return, but this would come from API later on.
    const gameboard: GameBoard = {
        board:[["_","O","_"],["_","X","_"],["X","_","_"]],
        atTurn:"UserId"
    }

    return {
        gameboard
    }
}
