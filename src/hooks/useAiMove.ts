import {useNewGameMove} from "./useNewGameMove.ts";
import type {GameBoard} from "../models/GameBoard.ts";
import type {MoveRequest} from "../models/MoveRequest.ts";
import type {GameBoardCellContent} from "../models/GameBoardCellContent.ts";

export function useAiMove(aiPlayerId: string) {
    const {requestMove} = useNewGameMove();

    //DEV FUNCTION this would be the AI call to backend which calls the AI model.
    function selectRandomEmptyInBoard(board: GameBoardCellContent[][],) {
        const emptyCells: { x: number; y: number }[] = [];
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                if (board[y][x] === "_") {
                    emptyCells.push({ x, y });
                }
            }
        }

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];


        const data: MoveRequest = {
            x: randomCell.y,
            y: randomCell.x,
            player: aiPlayerId
        }
        return data;
    }

    async function makeAiMove(gameBoard: GameBoard) {
        const move = selectRandomEmptyInBoard(gameBoard.board);
        return requestMove({gameId:gameBoard.id ,moveRequest: move})
    }

    return {
        makeAiMove
    }

}