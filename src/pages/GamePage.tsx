import {type MouseEvent, useEffect, useState} from "react";
import {Typography, Box, Stack, Paper, useTheme, Snackbar, Alert} from "@mui/material";
import {VisualGameBoard} from "../components/VisualGameBoard.tsx";
import {CurrentPlayerComponent} from "../components/CurrentPlayerComponent.tsx";
import {useAiMove} from "../hooks/useAiMove.ts";
import {useGameBoard} from "../hooks/useGameBoard.ts";
import {EndScreen} from "../components/EndScreen.tsx";
import {useCurrentPlayerSessionStore} from "../store/gameStore.ts";

export function GamePage() {
    const {gameState} = useGameBoard();
    const {requestAiMove} = useAiMove();
    const currentPlayerId = useCurrentPlayerSessionStore((state) => state.currentPlayerId)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        if (gameState?.isAiGame && !gameState?.atTurn && gameState && gameState.status === "IN_PROGRESS") {
            console.log("Using the AI player.");
            requestAiMove(gameState.id);
        }
    }, [gameState?.atTurn, gameState?.status, gameState?.isAiGame]);

    if(currentPlayerId === null){
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

    function isMyTurn(){
        if(gameState?.isAiGame){
            return gameState.atTurn;
        }
        if(gameState?.atTurn){
            return gameState.player1 === currentPlayerId;
        }else{
            console.log(gameState?.player2 , " " , currentPlayerId)
            return gameState?.player2 === currentPlayerId;
        }
    }

    console.log(isMyTurn());

    if (gameState?.status === "WON" || gameState?.status === "DRAW") {
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
                <Stack direction={"row"}>
                    <Typography variant={"h4"}>Tic Tac Toe</Typography>
                </Stack>
                {gameState &&
                    <>
                        <CurrentPlayerComponent isCurrentlyPlaying={isMyTurn()}
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