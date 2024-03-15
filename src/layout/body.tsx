import React, {type PropsWithChildren, type ReactElement} from 'react';
import {Box} from '@mui/joy';

interface BodyProperties {
    top?: ReactElement;
    title?: ReactElement;
}

export function Body({top, title, children}: PropsWithChildren<BodyProperties>) {
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
                        mb: 3,
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
            {children}
        </Box>
    );
}