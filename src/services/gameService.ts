import axios from "axios";
import type {GameBoard} from "../models/GameBoard.ts";
import type {MatchRequest} from "../models/MatchRequest.ts";

export async function startGame(data: MatchRequest){
    const {data:newGame} = await axios.post<GameBoard>('/matches/', data)
    return newGame
}
