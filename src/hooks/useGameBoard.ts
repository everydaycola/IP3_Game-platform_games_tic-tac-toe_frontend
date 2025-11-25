import {useQuery} from "@tanstack/react-query";
import {getGame} from "../services/gameService.ts";

export function useGameBoard(gameId: string | null, options?: { enabled?: boolean }) {
    const {data: gameState, isError, isPending} = useQuery({
        queryKey: ["game", gameId],
        queryFn: () => getGame(gameId),
        ...options
    });

    return {
        isError,
        isPending,
        gameState
    }
}