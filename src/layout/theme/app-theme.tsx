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
                            font-family: 'Martian Mono Variable', monospace;
                            font-size: 0.84em;
                        }
                        :root, [data-mui-color-scheme="light"] {
                            // --template-palette-TableCell-border: #ddd !important;
                            
                            --template-palette-Table-border: #cbd5e1;
                            --template-palette-TableCell-headBackground: #f1f5f9;
                            --template-palette-TableCell-dataBackground: #f9fafc;
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
                    },
                    styleOverrides: {
                        root: {
                            overflow: 'auto',
                        }
                    }
                },
                MuiLink: {
                    styleOverrides: {
                        root: {
                            textDecoration: 'none',
                        }
                    }
                },
                MuiInputBase: {
                    styleOverrides: {
                        root: {
                            background: 'rgba(255,255,255,0.07)',
                        }
                    }
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            textTransform: 'none',
                        },
                        contained: {
                            boxShadow: '0 0 1px 0px rgba(0, 0, 0, 0.1) !important',
                            fontWeight: 600
                        }
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