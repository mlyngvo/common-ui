import {CssBaseline, ThemeOptions, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import React, {PropsWithChildren, useMemo} from 'react';

import {colorSchemes, shadows, shape, typography} from './primitives';

interface AppThemeProps extends PropsWithChildren {
    themeComponents?: ThemeOptions['components'];
}

export function AppTheme({children, themeComponents}: AppThemeProps) {
    const theme = useMemo(() =>
        createTheme({
            // For more details about CSS variables configuration,
            // see https://mui.com/material-ui/customization/css-theme-variables/configuration/
            cssVariables: {
                colorSchemeSelector: 'data-mui-color-scheme',
                cssVarPrefix: 'template',
            },
            colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
            typography,
            shadows,
            shape,
            components: {
                MuiCssBaseline: {
                    styleOverrides: `
                        code {
                            font-family: "'Martian Mono Variable', monospace";
                        }
                    `
                },
                MuiLinearProgress: {
                    styleOverrides: {
                        root: {
                            borderRadius: 2
                        }
                    }
                },
                MuiCard: {
                    defaultProps: {
                        variant: 'outlined',
                    }
                },
                ...themeComponents,
            },
        })
        , [themeComponents]);

    return (
        <ThemeProvider theme={theme} disableTransitionOnChange>
            <CssBaseline enableColorScheme />
            {children}
        </ThemeProvider>
    );
}