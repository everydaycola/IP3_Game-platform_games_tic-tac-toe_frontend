import axios from "axios";
import type {GameBoard} from "../models/GameBoard.ts";
import type {MatchRequest} from "../models/MatchRequest.ts";
import type {MoveRequest} from "../models/MoveRequest.ts";

export async function getGame(gameId: string|null){
    if(gameId === null){
        return null;
    }
    const {data:gameboard} = await axios.get<GameBoard>(`/matches/${gameId}`)
    return gameboard;
}

export async function startGame(data: MatchRequest){
    const {data:newGame} = await axios.post<GameBoard>('/matches/', data)
    return newGame
}

export async function makeMove(gameId: string,data: MoveRequest){
    const {data:newMove} = await axios.patch<GameBoard>(`/matches/${gameId}`, data);
    return newMove;
}