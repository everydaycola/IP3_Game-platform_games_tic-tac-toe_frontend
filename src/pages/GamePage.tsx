import {type MouseEvent, useEffect, useState} from "react";
import {Typography, Box, Stack, Paper, useTheme, Snackbar, Alert, Button} from "@mui/material";
import {VisualGameBoard} from "../components/VisualGameBoard.tsx";
import {CurrentPlayerComponent} from "../components/CurrentPlayerComponent.tsx";
import {useAiMove} from "../hooks/useAiMove.ts";
import {useOngoingGameBoard} from "../hooks/useOngoingGameBoard.ts";
import {EndScreen} from "../components/EndScreen.tsx";
import {useCurrentGameStore} from "../store/gameStore.ts";
import {useSecurityStore} from "../store/securityStore.ts";
import {useStartNewGame} from "../hooks/useStartNewGame.ts";

export function GamePage() {
    const {gameState} = useOngoingGameBoard();
    const {createGame} = useStartNewGame();
    const updateCurrentGameId = useCurrentGameStore((state) => state.updateCurrentGameId);
    const {requestAiMove} = useAiMove();
    const loggedInUser = useSecurityStore((state) => state.loggedInUser);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const theme = useTheme();


    useEffect(() => {
        if (gameState?.id) {
            updateCurrentGameId(gameState.id);
        }

        if (gameState?.isAiGame && !gameState?.atTurn && gameState && gameState.status === "IN_PROGRESS") {
            console.log("Using the AI player.");
            requestAiMove(gameState.id);
        }
    }, [gameState?.id, gameState?.atTurn, gameState?.status, gameState?.isAiGame]);

    if (loggedInUser?.id === null) {
        return (<Stack
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
                p: 4,
                height: "100svh"
            }}
        >
            <Typography variant={"h4"}>Player not signed in... Logout and try again!</Typography>
        </Stack>)
    }

    function handleMoveWhileNotAtTurn(e: MouseEvent) {
        e.stopPropagation();
        setSnackbarOpen(true);
    }

    function isMyTurn() {
        if (gameState?.isAiGame) {
            return gameState.atTurn;
        }
        if (gameState?.atTurn) {
            return gameState.player1 === loggedInUser?.id;
        } else {
            return gameState?.player2 === loggedInUser?.id;
        }
    }

    if (gameState != null && (gameState.status === "WON" || gameState.status === "DRAW")) {
        return <EndScreen
            gameBoard={gameState}
            winningUser={gameState.winner}
            status={gameState.status}/>;
    }

    return (
        <>
            <Box
                sx={{p: 2, position: "relative"}}
            >
                {!gameState &&
                    <>
                        <Stack direction={"column"}
                               alignItems={"center"}
                               sx={{p: 4}}
                               justifyContent={"center"}>
                            <Typography variant={"h2"}>Welcome to tic-tac-toe!</Typography>
                            <Button
                                onClick={() => createGame()}
                                variant={"contained"}
                                sx={{mt: 1}}
                            >
                                Start a new training game!
                            </Button>
                        </Stack>
                    </>
                }


                {gameState &&
                    <Paper
                        className={"overlay"}
                        sx={{
                            zIndex: 100,
                            position: "absolute",
                            height: "100vh",
                            top: 0,
                            opacity: 0.3,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: isMyTurn() ? "none" : "initial",
                            background: theme.palette.primary.main,
                        }}
                        onClick={(e) => {
                            handleMoveWhileNotAtTurn(e)
                        }}
                    />
                }
                {gameState &&
                    <>
                        <CurrentPlayerComponent isCurrentlyPlaying={isMyTurn()}
                                                isAiGame={gameState.isAiGame}
                                                currentUser={gameState.atTurn ? gameState.player1 : gameState.player2}/>
                        <Stack sx={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <VisualGameBoard gameboard={gameState}/>
                        </Stack>
                    </>
                }
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <Alert severity="warning"
                       onClose={() => setSnackbarOpen(false)}>
                    Het is niet jouw beurt :'(
                </Alert>
            </Snackbar>
        </>
    );
}