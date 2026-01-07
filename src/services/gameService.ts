import axios from "axios";
import type {GameBoard} from "../models/GameBoard.ts";
import type {MatchRequest} from "../models/MatchRequest.ts";
import type {MoveRequest} from "../models/MoveRequest.ts";

export async function getOngoingGame() {
    try {
        const {data} = await axios.get<GameBoard>(`/matches/playing`)
        return data as GameBoard;
    } catch (e) {
        return null;
    }
}

export async function getGame(gameId: string | null) {
    if (gameId === null) {
        return null;
    }
    const {data: gameboard} = await axios.get<GameBoard>(`/matches/${gameId}`)
    return gameboard;
}

//currently not in use but left if we decide to accept "local playing".
export async function startGame(data: MatchRequest) {
    const {data: newGame} = await axios.post<GameBoard>('/matches/', data)
    return newGame
}

export async function startGameWithAi() {
    const {data: newGame} = await axios.post<GameBoard>('/matches/ai')
    return newGame
}

export async function makeMove(gameId: string, data: MoveRequest) {
    const {data: newMove} = await axios.patch<GameBoard>(`/matches/${gameId}`, data);
    return newMove;
}

export async function makeAiMove(gameId: string) {
    const {data: newAiMove} = await axios.patch<GameBoard>(`/matches/${gameId}/ai`);
    return newAiMove;
}