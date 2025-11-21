import {Box, Typography} from "@mui/material";


interface GameBoardCellProps {
    content: string;
    size?: number;
}

export function GameBoardCell({content, size = 50}: GameBoardCellProps) {
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
