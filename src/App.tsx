import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme/theme.ts";
import {WelcomeComponent} from "./components/WelcomeComponent.tsx";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <WelcomeComponent/>
            </ThemeProvider>
        </>
    )
}

export default App
