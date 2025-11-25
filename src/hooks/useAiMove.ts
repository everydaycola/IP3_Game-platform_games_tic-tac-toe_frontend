import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeAiMove} from "../services/gameService.ts";
import {gameQueryKeys} from "../config/api/querykeys";

export function useAiMove() {
    const queryClient = useQueryClient();
    const {mutate, isPending, isError} = useMutation({
        mutationFn: (gameId: string) => makeAiMove(gameId),
        onSuccess: (gameId) => {
            queryClient.invalidateQueries({
                queryKey: [gameQueryKeys.current, gameId]
            });

        }
    })

    return {
        requestAiMove:mutate,
        isPending,
        isError
    }
}