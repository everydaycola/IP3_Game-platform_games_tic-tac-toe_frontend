import {create} from "zustand";

interface PlayerSessionState {
    currentGameId: string | null;
    currentPlayerId: string |null;
}

interface PlayerSessionActions {
    updateCurrentGameId: (id: string | null) => void;
    updateCurrentPlayerId: (id:string | null) => void;
}


export const useCurrentPlayerSessionStore = create<
    PlayerSessionState & PlayerSessionActions
>((set) => ({
    //State
    currentGameId:
        typeof window !== "undefined"
            ? localStorage.getItem("ttt-gameid")
            : null,
    currentPlayerId: null,

    // Actions
    updateCurrentGameId: (id) => {
        if (typeof window !== "undefined") {
            if (id === null) {
                localStorage.removeItem("ttt-gameid");
            } else {
                localStorage.setItem("ttt-gameid", id);
            }
        }
        set({ currentGameId: id });
    },
    updateCurrentPlayerId: (id) => {
        set({ currentPlayerId: id });
    },
}));