import { Typography, Card, Avatar, CardContent } from "@mui/material";

interface CurrentPlayerComponentProps{
    currentUser: string;
}

export function CurrentPlayerComponent({ currentUser }: CurrentPlayerComponentProps) {
    return (
        <Card sx={{ display: "flex", alignItems: "center", padding: 2, width:"25%", mt:2 }}>
            <Avatar
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                alt="Player"
                sx={{ width: 64, height: 64, marginRight: 2 }}
            />

            <CardContent sx={{ padding: 0 }}>
                <Typography variant="body1">
                    Current player: {currentUser}
                </Typography>
                <Typography variant="h4">X</Typography>
            </CardContent>
        </Card>
    );
}