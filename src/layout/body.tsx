import React, {type PropsWithChildren, type ReactElement} from 'react';
import {Alert, Box, LinearProgress} from '@mui/joy';

interface BodyProperties {
    top?: ReactElement;
    title?: ReactElement;
    error?: Error;
    loading?: boolean;
}

export function Body({top, title, error, loading, children}: PropsWithChildren<BodyProperties>) {
    return (
        <Box
            component="main"
            sx={{
                px: { xs: 2, md: 6 },
                pt: {
                    xs: 'calc(12px + var(--Header-height))',
                    sm: 'calc(12px + var(--Header-height))',
                    md: 3,
                },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '100dvh',
                gap: 1,
                overflow: 'auto'
            }}
        >
            {top !== undefined && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {top}
                </Box>
            )}
            {title !== undefined && (
                <Box
                    sx={{
                        display: 'flex',
                        mb: 2,
                        gap: 1,
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'start', sm: 'center' },
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    {title}
                </Box>
            )}

            {loading === true && (
                <LinearProgress />
            )}

            {error !== undefined && (
                <Alert color="danger" variant="soft">
                    {error?.message}
                </Alert>
            )}

            {children}
        </Box>
    );
}