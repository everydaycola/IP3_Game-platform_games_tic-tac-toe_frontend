import {Box, Stack, Typography, Divider} from "@mui/material";
import {useGameBoard} from "../hooks/useGameBoard.ts";
import {Fragment} from "react";


interface GameBoardCellProps {
    content: string;
    size?: number;
}

function GameBoardCell({content, size = 50}: GameBoardCellProps) {
    return (
        <>
            <Box sx={{
                width: size,
                height: size,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Typography fontWeight={"bold"} fontSize={size}>
                    {content}
                </Typography>
            </Box>
        </>
    )
}

export function GameBoard() {
    const {gameboard} = useGameBoard();

    return (
        <Box>
            <Stack direction="column" spacing={0}>
                {gameboard.board.map((row, rowIdx) => (
                    <Fragment key={rowIdx}>
                        <Stack direction="row" spacing={0} alignItems="center">
                            {row.map((cell, colIdx) => (
                                <Fragment key={colIdx}>
                                    <GameBoardCell content={cell !== "_" ? cell : ""} size={150}/>
                                    {colIdx < row.length - 1 && (
                                        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 15 }}/>
                                    )}
                                </Fragment>
                            ))}
                        </Stack>
                        {rowIdx < gameboard.board.length -1 &&
                            <Divider orientation="horizontal" sx={{borderTopWidth:15}} flexItem/>
                        }
                    </Fragment>
                ))}
            </Stack>
        </Box>
    );
}