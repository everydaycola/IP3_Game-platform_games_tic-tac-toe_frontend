import {useMutation, useQueryClient} from "@tanstack/react-query";
import { startGameWithAi} from "../services/gameService.ts";
import {gameQueryKeys} from "../config/api/querykeys";
import {useCurrentGameStore} from "../store/gameStore.ts";
import type {GameBoard} from "../models/GameBoard.ts";

export function useStartNewGame(){
    const queryClient = useQueryClient();
    const updateCurrentGameId = useCurrentGameStore((state) => state.updateCurrentGameId)

    const{mutate,isPending,isError,data: newGame} = useMutation(
        {
            mutationFn: async() => {
                return startGameWithAi();
            },
            onSuccess:(gameBoard: GameBoard) => {
                updateCurrentGameId(gameBoard.id);
                queryClient.invalidateQueries({queryKey: gameQueryKeys.current});
            }
        }
    )

    return {
        isPending: isPending,
        isError: isError,
        createGame: mutate,
        newGame
    };
}
