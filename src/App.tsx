import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme/theme.ts";
import {GamePage} from "./pages/GamePage.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./config/api";
import {RouteGuard} from "./components/RouteGuard.tsx";
import {useInitSecurity} from "./hooks/security/useInitSecurity.tsx";

function App() {
    useInitSecurity();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <RouteGuard>
                            <GamePage/>
                        </RouteGuard>
                    </ThemeProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
