import axios from "axios";
import type {GameBoard} from "../models/GameBoard.ts";
import type {MatchRequest, MatchRequestAi} from "../models/MatchRequest.ts";
import type {MoveRequest} from "../models/MoveRequest.ts";

async function getOngoingGame(userId: string){
    const {data} = await axios.get<GameBoard>(`/players/${userId}/playing`)

    if("board" in data){
        return data as GameBoard;
    }
    return null;
}

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
export async function startGameWithAi(data: MatchRequestAi){
    const {data:newGame} = await axios.post<GameBoard>('/matches/ai', data)
    return newGame
}

export async function makeMove(gameId: string,data: MoveRequest){
    const {data:newMove} = await axios.patch<GameBoard>(`/matches/${gameId}`, data);
    return newMove;
}

export async function makeAiMove(gameId:string){
    const {data:newAiMove} = await axios.patch<GameBoard>(`/matches/${gameId}/ai`);
    return newAiMove;
}