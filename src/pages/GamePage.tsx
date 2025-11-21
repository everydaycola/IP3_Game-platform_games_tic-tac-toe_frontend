import { Typography, Box, Stack } from "@mui/material";
import {GameBoard} from "../components/GameBoard.tsx";

export function GamePage() {
    return (
        <Box
            sx={{p:2}}
        >
            <Typography variant={"h4"}>Tic Tac Toe</Typography>
            <Stack sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <GameBoard/>
            </Stack>
        </Box>
    );
}