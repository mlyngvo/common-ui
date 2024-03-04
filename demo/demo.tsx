import React, {type PropsWithChildren, type ReactElement} from 'react';
import {Box, Button, Stack} from '@mui/joy';
import {HashRouter, Route, Routes, useNavigate} from 'react-router-dom';
import {DemoErrorBoundary} from './page/error-boundary';

const routes: Record<string, ReactElement> = {
    '/error-boundary': <DemoErrorBoundary />
};

function Shell({children}: PropsWithChildren) {
    const navigate = useNavigate();

    return (
        <>
            <Stack
                direction="row"
                justifyContent="center"
            >
                <Button variant="outlined" onClick={() => { navigate('/error-boundary'); }}>Error Boundary</Button>
            </Stack>
            <Box my={3} />
            {children}
        </>
    );
}

export function Demo() {
    return (
        <HashRouter>
            <Shell>
                <Routes>
                    {Object.entries(routes).map(([path, element], index) => (
                        <Route key={`route-${  index}`} {...{path, element}} />
                    ))}
                </Routes>
            </Shell>
        </HashRouter>
    );
}