import {Button, Stack, Typography} from "@mui/material";
import type {GameStatus} from "../models/GameStatus.ts";
import {VisualGameBoard} from "./VisualGameBoard.tsx";
import type {GameBoard} from "../models/GameBoard.ts";
import {useCurrentGameStore} from "../store/gameStore.ts";
import {gameQueryKeys} from "../config/api/querykeys";
import {useQueryClient} from "@tanstack/react-query";

interface EndScreenProps {
    gameBoard:GameBoard,
    winningUser: string;
    status: GameStatus;
}

export function EndScreen({gameBoard,winningUser,status}: EndScreenProps) {
    const updateCurrentGameId = useCurrentGameStore((state) => state.updateCurrentGameId);
    const queryClient = useQueryClient();
    return (
        <>
            <Stack direction={"row"}>
                <Stack
                    direction={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                        p:4
                }}
                >
                    <Typography variant={"h2"} sx={{m:2}}>
                       Eindstatus spelbord
                    </Typography>
                    <VisualGameBoard isInteractive={false} gameboard={gameBoard}/>
                </Stack>
                <Stack
                    direction={"column"}
                    alignItems={"start"}
                    justifyContent={"center"}
                    sx={{
                        p: 4,
                        height:"100svh"
                    }}
                >
                    {status === "WON" &&
                        <Typography variant={"h3"}>{winningUser} heeft gewonnen!</Typography>
                    }
                    {status === "DRAW" &&
                        <Typography variant={"h3"}>Gelijkspel!</Typography>
                    }
                    <Button
                        sx={{mt:2}}
                        color={"secondary"}
                        variant={"contained"}
                        onClick={() => {
                            updateCurrentGameId(null)
                            queryClient.invalidateQueries({ queryKey:gameQueryKeys.current });
                        }}
                    >
                        Overzicht sluiten
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}