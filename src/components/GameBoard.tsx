import {Box, Stack, Divider, useMediaQuery} from "@mui/material";
import {useGameBoard} from "../hooks/useGameBoard.ts";
import {Fragment} from "react";
import {GameBoardCell} from "./GameBoardCell.tsx";
import {theme} from "../config/theme/theme.ts";

export function GameBoard() {
    const {gameboard} = useGameBoard();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box>
            <Stack direction="column" spacing={0}>
                {gameboard.board.map((row, rowIdx) => (
                    <Fragment key={rowIdx}>
                        <Stack direction="row" spacing={0} alignItems="center">
                            {row.map((cell, colIdx) => (
                                <Fragment key={colIdx}>
                                    <GameBoardCell content={cell !== "_" ? cell : ""} size={isSmallScreen? 75:150}/>
                                    {colIdx < row.length - 1 && (
                                        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: isSmallScreen? 7:15 }}/>
                                    )}
                                </Fragment>
                            ))}
                        </Stack>
                        {rowIdx < gameboard.board.length -1 &&
                            <Divider orientation="horizontal" sx={{borderTopWidth:isSmallScreen? 7:15}} flexItem/>
                        }
                    </Fragment>
                ))}
            </Stack>
        </Box>
    );
}