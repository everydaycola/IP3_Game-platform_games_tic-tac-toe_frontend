import {useQuery} from "@tanstack/react-query";
import {getOngoingGame} from "../services/gameService.ts";
import {gameQueryKeys} from "../config/api/querykeys";

export function useGameBoard() {
    const {data: gameState, isError, isPending} = useQuery({
        queryKey: gameQueryKeys.current,
        queryFn: () => {
            return getOngoingGame();
        },
    });

    return {
        isError,
        isGamePending: isPending,
        gameState
    }
}