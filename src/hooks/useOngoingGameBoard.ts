import {useQuery} from "@tanstack/react-query";
import {getOngoingGame, getGame} from "../services/gameService.ts";
import {gameQueryKeys} from "../config/api/querykeys";
import {pollInterval} from "../config/realtime";
import {useCurrentGameStore} from "../store/gameStore.ts";

export function useOngoingGameBoard() {
    const currentGameId = useCurrentGameStore.getState().currentGameId;

    const {data: gameState, isError, isPending} = useQuery({
        queryKey: gameQueryKeys.current,
        queryFn: async () => {
            const activeGame = await getOngoingGame();
            console.log("fetching active game", activeGame);
            if (!activeGame && currentGameId) {
                const finishedGame = await getGame(currentGameId);
                console.log("fetching game as fallback...", finishedGame);
                return finishedGame;
            }
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
