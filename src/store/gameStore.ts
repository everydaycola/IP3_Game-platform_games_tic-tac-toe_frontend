import {create} from "zustand";

interface PlayerSessionState {
    currentGameId: string | null;
}

interface PlayerSessionActions {
    updateCurrentGameId: (id: string | null) => void;
}

export const useCurrentPlayerSessionStore = create<PlayerSessionState & PlayerSessionActions>((set, get) => ({
    currentGameId: null,
    updateCurrentGameId: (id) => {
        set({currentGameId: id});
    },
}));