import { Typography, Box, Stack} from "@mui/material";
import {GameBoard} from "../components/GameBoard.tsx";
import {CurrentPlayerComponent} from "../components/CurrentPlayerComponent.tsx";

//Todo when we connect with the backend its important to retrieve the actualy users name.
export function GamePage() {
    return (
        <Box
            sx={{p:2, position:"relative"}}
        >
            <Typography variant={"h4"}>Tic Tac Toe</Typography>
            <CurrentPlayerComponent currentUser={"UserName"}/>
            <Stack sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <GameBoard/>
            </Stack>
        </Box>
    );
}