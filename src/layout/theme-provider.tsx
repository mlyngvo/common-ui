import React, {type PropsWithChildren} from 'react';
import {CssBaseline, CssVarsProvider, extendTheme} from '@mui/joy';
import {type CSSObject} from '@emotion/styled';

import '@fontsource/be-vietnam-pro';
import '@fontsource-variable/martian-mono';

const BASE_FONT_SIZE = 1.2;

const headings = {
    h1: computeTypoSize(2),
    h2: computeTypoSize(1.63),
    h3: computeTypoSize(1.19),
    h4: computeTypoSize(0.93),
};

const titles = {
    'title-lg': computeTypoSize(1),
    'title-md': computeTypoSize(0.83),
    'title-sm': computeTypoSize(0.75),
};

const bodies = {
    'body-lg': computeTypoSize(0.93),
    'body-md': computeTypoSize(0.79),
    'body-sm': computeTypoSize(0.7, 500),
    'body-xs': computeTypoSize(0.62, 500),
};

const theme = extendTheme({
    fontFamily: {
        body: "'Be Vietnam Pro', sans-serif",
        display: "'Be Vietnam Pro', sans-serif",
        code: "'Martian Mono Variable', monospace",
    },
    typography: {
        ...headings,
        ...titles,
        ...bodies,
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: '#e3f2fd',
                    100: '#bbdefb',
                    200: '#90caf9',
                    300: '#64b5f6',
                    400: '#42a5f5',
                    500: '#2196f3',
                    600: '#1e88e5',
                    700: '#1976d2',
                    800: '#1565c0',
                    900: '#0d47a1'
                },
                neutral: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a'
                },
                warning: {
                    50: '#fff8e1',
                    100: '#ffecb3',
                    200: '#ffe082',
                    300: '#ffd54f',
                    400: '#ffca28',
                    500: '#ffc107',
                    600: '#ffb300',
                    700: '#ffa000',
                    800: '#ff8f00',
                    900: '#ff6f00'
                },
                success: {
                    50: '#e8f5e9',
                    100: '#c8e6c9',
                    200: '#a5d6a7',
                    300: '#81c784',
                    400: '#66bb6a',
                    500: '#4caf50',
                    600: '#43a047',
                    700: '#388e3c',
                    800: '#2e7d32',
                    900: '#1b5e20'
                },
                danger: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d'
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    50: '#e3f2fd',
                    100: '#bbdefb',
                    200: '#90caf9',
                    300: '#64b5f6',
                    400: '#42a5f5',
                    500: '#2196f3',
                    600: '#1e88e5',
                    700: '#1976d2',
                    800: '#1565c0',
                    900: '#0d47a1'
                },
                danger: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d'
                },
                success: {
                    50: '#e8f5e9',
                    100: '#c8e6c9',
                    200: '#a5d6a7',
                    300: '#81c784',
                    400: '#66bb6a',
                    500: '#4caf50',
                    600: '#43a047',
                    700: '#388e3c',
                    800: '#2e7d32',
                    900: '#1b5e20'
                },
                warning: {
                    50: '#fefce8',
                    100: '#fef9c3',
                    200: '#fef08a',
                    300: '#fde047',
                    400: '#facc15',
                    500: '#eab308',
                    600: '#ca8a04',
                    700: '#a16207',
                    800: '#854d0e',
                    900: '#713f12'
                },
                neutral: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827'
                }
            }
        }
    },
    components: {
        JoySheet: {
            styleOverrides: {
                root: {
                    borderRadius: 7
                }
            }
        }
    }
});

function computeTypoSize(factor: number, weight?: number): CSSObject {
    return {
        fontSize: `${BASE_FONT_SIZE * factor  }rem`,
        fontWeight: weight
    };
}

export function AppThemeProvider({children}: PropsWithChildren) {

    return (
        <CssVarsProvider
            disableTransitionOnChange
            theme={theme}
        >
            <CssBaseline />
            {children}
        </CssVarsProvider>
    );
}