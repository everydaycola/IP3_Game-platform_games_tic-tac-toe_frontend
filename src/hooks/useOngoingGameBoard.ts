import {useQuery} from "@tanstack/react-query";
import {getOngoingGame} from "../services/gameService.ts";
import {gameQueryKeys} from "../config/api/querykeys";
import {pollInterval} from "../config/realtime";

export function useOngoingGameBoard() {

    const {data: gameState, isError, isPending} = useQuery({
        queryKey: gameQueryKeys.current,
        queryFn: async () => {
            const activeGame = await getOngoingGame();
            return activeGame;
        },
        refetchInterval: pollInterval
    });

    return {
        isError,
        isGamePending: isPending,
        gameState
    }
}
