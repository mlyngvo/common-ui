import React, {type PropsWithChildren, type ReactElement} from 'react';
import {Box, Button, Container, Divider, Stack} from '@mui/joy';
import {HashRouter, Route, Routes, useNavigate} from 'react-router-dom';
import {DemoErrorBoundary} from './page/error-boundary';
import {AppThemeProvider} from '../src';
import {DemoTypography} from './page/typography';
import {DemoLocalization} from './page/localization';
import {DemoLayout} from './page/layout';
import {DemoAuthForgotPassword, DemoAuthLogin} from './page/auth';
import {DemoAvatarEditor} from "./page/avatar-editor";

const routes: Record<string, { title: string, element: ReactElement }> = {
    '/error-boundary': { title: 'Error Boundary', element: <DemoErrorBoundary /> },
    '/typography': { title: 'Typography', element: <DemoTypography /> },
    '/localization': { title: 'Localization', element: <DemoLocalization /> },
    '/layout': { title: 'Layout', element: <DemoLayout /> },
    '/auth/login': { title: 'Auth Login', element: <DemoAuthLogin /> },
    '/auth/forgot': { title: 'Auth Forgot Password', element: <DemoAuthForgotPassword /> },
    '/avatar': { title: 'Avatar Editor', element: <DemoAvatarEditor /> },
};

function Shell({children}: PropsWithChildren) {
    const navigate = useNavigate();

    const disable = window.location.href.includes('layout');
    return (
        <AppThemeProvider>
            {!disable && (
                <Container
                    sx={{
                        mt: 10
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        {Object.entries(routes).map(([path, { title }]) => (
                            <Button
                                key={path}
                                variant="solid"
                                size="sm"
                                onClick={() => { navigate(path); }}
                            >
                                {title}
                            </Button>
                        ))}
                    </Stack>
                    <Box my={3}>
                        <Divider />
                    </Box>
                </Container>
            )}

            {children}
        </AppThemeProvider>
    );
}

export function Demo() {
    return (
        <HashRouter>
            <Shell>
                <Routes>
                    {Object.entries(routes).map(([path, { element }]) => (
                        <Route key={path} {...{path, element}} />
                    ))}
                </Routes>
            </Shell>
        </HashRouter>
    );
}