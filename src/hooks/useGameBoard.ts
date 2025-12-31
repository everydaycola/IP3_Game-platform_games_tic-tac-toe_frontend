import {useQuery} from "@tanstack/react-query";
import {getOngoingGame} from "../services/gameService.ts";
import {gameQueryKeys} from "../config/api/querykeys";
import {pollInterval} from "../config/realtime";

export function useGameBoard() {
    const {data: gameState, isError, isPending} = useQuery({
        queryKey: gameQueryKeys.current,
        queryFn: () => {
            return getOngoingGame();
        },
        refetchInterval:pollInterval
    });

    return {
        isError,
        isGamePending: isPending,
        gameState
    }
}