import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme/theme.ts";
import {GamePage} from "./pages/GamePage.tsx";


function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <GamePage/>
            </ThemeProvider>
        </>
    )
}

export default App
