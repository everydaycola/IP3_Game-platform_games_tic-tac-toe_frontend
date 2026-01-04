import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeAiMove} from "../services/gameService.ts";
import {gameQueryKeys} from "../config/api/querykeys";

export function useAiMove() {
    const queryClient = useQueryClient();
    const {mutate, isPending, isError} = useMutation({
        mutationFn: (gameId: string) => makeAiMove(gameId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: gameQueryKeys.current});
        },
    })

    return {
        requestAiMove:mutate,
        isPending,
        isError
    }
}