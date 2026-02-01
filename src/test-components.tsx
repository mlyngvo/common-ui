import React from "react";
import {PropsWithChildren} from "react";
import { createTheme, ThemeProvider } from "@mui/material";

export function DefaultThemeProvider({children}: PropsWithChildren) {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme} disableTransitionOnChange>
            {children}
        </ThemeProvider>
    );

}