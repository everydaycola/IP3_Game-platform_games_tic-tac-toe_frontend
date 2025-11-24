import {Typography, Box, Stack, Button} from "@mui/material";
import {useStartNewGame} from "../hooks/useStartNewGame.ts";
import type {MatchRequest} from "../models/MatchRequest.ts";
import {VisualGameBoard} from "../components/VisualGameBoard.tsx";
import {CurrentPlayerComponent} from "../components/CurrentPlayerComponent.tsx";

const players: MatchRequest = {
    player1: "b85182a8-68f8-4d42-b0d5-6166bf2e8284",
    player2: "7ad223bd-bf5e-4945-8284-3a9c81e4e7a9"
}

//Todo when we connect with the backend its important to retrieve the actualy users name.
export function GamePage() {
    const {createGame, isPending, data} = useStartNewGame();

    if (isPending) {
        return <div>Starting a new game...</div>
    }

    return (
        <Box
            sx={{p: 2, position: "relative"}}
        >
            <Stack direction={"row"}>
                <Typography variant={"h4"}>Tic Tac Toe</Typography>
                <Button variant={"contained"}
                        sx={{ml: 2}}
                        onClick={() => createGame(players)}>
                    Start a game
                </Button>
            </Stack>

            {data &&
                <>
                    <CurrentPlayerComponent currentUser={data.atTurn? data.player1 : data.player2}/>
                    <Stack sx={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <VisualGameBoard gameboard={data}/>
                    </Stack>
                </>
            }


        </Box>
    );
}