import {create} from "zustand";

interface CurrentGameState {
    currentGameId: string | null;
}

interface CurrentGameActions {
    updateCurrentGameId: (id: string | null) => void;
}


export const useCurrentGameStore = create<
    CurrentGameState & CurrentGameActions
>((set) => ({
    //State
    currentGameId:
        typeof window !== "undefined"
            ? localStorage.getItem("ttt-gameid")
            : null,

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
}));