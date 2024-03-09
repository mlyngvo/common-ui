import {Box, Divider, IconButton, Modal, ModalDialog, Stack, Typography} from '@mui/joy';
import React, {type PropsWithChildren, type ReactElement} from 'react';
import {ColorSchemeToggle} from '../layout';

interface FormModalProperties {
    logo: ReactElement;
    appTitle: string;
    formTitle: string;
}

export function FormModal({logo, appTitle, formTitle, children}: PropsWithChildren<FormModalProperties>) {
    return (
        <Modal open>
            <ModalDialog
                maxWidth="xs"
                layout="center"
                sx={theme => ({
                    width: '80%',
                    [theme.breakpoints.up('sm')]: {
                        width: 500
                    }
                })}
            >
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                    <IconButton color="neutral" size="sm" sx={{ p: 0.75 }}>
                        {logo}
                    </IconButton>
                    <Typography level="title-md"><strong>{appTitle}</strong></Typography>
                    <ColorSchemeToggle sx={{ ml: 'auto' }} />
                </Box>

                <Divider />

                <Typography level="h3" sx={{ mt: 0.5 }}>{formTitle}</Typography>

                <Stack gap={4} sx={{ mt: 2 }}>
                    {children}
                </Stack>
            </ModalDialog>
        </Modal>
    );
}