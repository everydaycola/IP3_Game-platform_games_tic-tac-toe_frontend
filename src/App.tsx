import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme/theme.ts";
import {GamePage} from "./pages/GamePage.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./config/api";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import SecurityContextProvider from "./context/SecurityContextProvider.tsx";
import {RouteGuard} from "./components/RouteGuard.tsx";

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <SecurityContextProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <RouteGuard>
                            <GamePage/>
                        </RouteGuard>
                    </ThemeProvider>
                    <ReactQueryDevtools initialIsOpen={false}/>
                </SecurityContextProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
