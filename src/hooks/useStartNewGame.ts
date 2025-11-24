import {useMutation} from "@tanstack/react-query";
import {startGame} from "../services/gameService.ts";
import type {MatchRequest} from "../models/MatchRequest.ts";

export function useStartNewGame(){
    const{mutate,isPending,isError,data} = useMutation(
        {
            mutationFn: async(players: MatchRequest) => {
                return startGame(players);
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
