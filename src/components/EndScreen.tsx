import {Button, Stack, Typography} from "@mui/material";
import type {GameStatus} from "../models/GameStatus.ts";

interface EndScreenProps {
    winningUser: string;
    status: GameStatus;
    createGame: () => void;
}

export function EndScreen({winningUser,status,createGame}: EndScreenProps) {

    return (
        <>
            <Stack
                direction={"column"}
                alignItems={"center"}
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
                <Button variant={"contained"}
                        sx={{m: 2}}
                        onClick={createGame}
                >
                    Nieuw spel starten
                </Button>
            </Stack>
        </>
    )
}