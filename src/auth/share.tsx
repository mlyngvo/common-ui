import {Box, Dialog, DialogContent, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import {PropsWithChildren, ReactNode} from "react";
import React from "react";

interface FormDialogProperties {
    logo: ReactNode;
    appTitle: string;
    formTitle: string;
}

export function FormDialog({logo, appTitle, formTitle, children}: PropsWithChildren<FormDialogProperties>) {
    return (
        <Dialog
            open
            fullWidth
            maxWidth="xs"
        >
            <Stack
                direction="row"
                gap={1}
                alignItems="center"
                p={2}
            >
                <Avatar
                    variant="circular"
                    sx={{ width: 64, height: 64, p: 1.2, bgcolor: 'background.paper' }}
                >
                    {logo}
                </Avatar>
                <Box>
                    <Typography variant="h1" sx={{ fontSize: '0.9em' }} color="textSecondary"><strong>{appTitle}</strong></Typography>
                    <Typography variant="h2" sx={{ fontSize: '2em', fontWeight: 100 }}>{formTitle}</Typography>
                </Box>
            </Stack>
            <Divider />
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}