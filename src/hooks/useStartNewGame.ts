import {useMutation, useQueryClient} from "@tanstack/react-query";
import {startGame} from "../services/gameService.ts";
import type {MatchRequest} from "../models/MatchRequest.ts";
import {gameQueryKeys} from "../config/api/querykeys";

export function useStartNewGame(){
    const queryClient = useQueryClient();

    const{mutate,isPending,isError,data} = useMutation(
        {
            mutationFn: async(players: MatchRequest) => {
                return startGame(players);
            },
            onSuccess:() => {
                queryClient.invalidateQueries({queryKey: gameQueryKeys.current});
            }

        }
    )

    return{
        isPending,
        isError,
        createGame:mutate,
        data
    }
}
