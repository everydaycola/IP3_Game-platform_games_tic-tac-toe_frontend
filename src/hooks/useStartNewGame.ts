import {useMutation, useQueryClient} from "@tanstack/react-query";
import { startGameWithAi} from "../services/gameService.ts";
import type { MatchRequestAi} from "../models/MatchRequest.ts";
import {gameQueryKeys} from "../config/api/querykeys";

export function useStartNewGame(){
    const queryClient = useQueryClient();

    const{mutate,isPending,isError,data: newGame} = useMutation(
        {
            mutationFn: async(player: MatchRequestAi) => {
                return startGameWithAi(player);
            },
            onSuccess:() => {
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
