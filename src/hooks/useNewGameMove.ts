import {useMutation, useQueryClient} from "@tanstack/react-query";
import { makeMove} from "../services/gameService.ts";
import { gameQueryKeys } from "../config/api/querykeys";
import type { MoveRequest } from "../models/MoveRequest.ts";
import type {GameBoard} from "../models/GameBoard.ts";
import {useGameBoard} from "./useGameBoard.ts";

interface MoveVariables{
    gameId: string;
    moveRequest: MoveRequest;
}

export function useNewGameMove() {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError,data: mutationData } = useMutation({
        mutationFn: async ({ gameId, moveRequest }: MoveVariables) => {
            return makeMove(gameId, moveRequest);
        },
        onSuccess: (gameState: GameBoard) => {
            queryClient.invalidateQueries({ queryKey: [gameQueryKeys.current, gameState.id] });
        },
    });

    const newGame = mutationData;
    const gameId = newGame?.id ?? null;
    const {gameState, isError: isGameError, isPending: isGamePending} = useGameBoard(gameId,{ enabled: !!newGame?.id } );

    return {
        isPending,
        isError,
        isGameError,
        isGamePending,
        requestMove: mutate,
        gameState
    };
}