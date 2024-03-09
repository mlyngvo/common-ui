import React, {type ReactElement} from 'react';
import {
    Box, Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input, Link,
    Stack,
} from '@mui/joy';
import {FormModal} from './modal';

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    persistent: HTMLInputElement;
}

interface LoginFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export interface LoginFormData {
    email: string;
    password: string;
    persistent: boolean;
}

interface LoginDialogProperties {
    appTitle: string;
    logo: ReactElement;
    onSubmit: (data: LoginFormData) => void;
    formText: {
        form?: string;
        email?: string;
        password?: string;
        persistent?: string;
        forgotPassword?: string;
        submit?: string;
    }|undefined;
    forgotPasswordUrl: string|undefined;
}

export function LoginDialog({appTitle, logo, onSubmit, formText, forgotPasswordUrl}: LoginDialogProperties) {
    const {
        form,
        email,
        password,
        persistent,
        forgotPassword,
        submit,
    } = formText ?? {};

    function handleFormSubmit(event: React.FormEvent<LoginFormElement>) {
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        const data: LoginFormData = {
            email: formElements.email.value,
            password: formElements.password.value,
            persistent: formElements.persistent.checked,
        };
        onSubmit(data);
    }

    return (
        <FormModal
            logo={logo}
            appTitle={appTitle}
            formTitle={form ?? 'Login'}
        >
            <form onSubmit={handleFormSubmit}>
                <FormControl>
                    <FormLabel>{email ?? 'Email'}</FormLabel>
                    <Input type="email" name="email"/>
                </FormControl>
                <Box my={3}/>
                <FormControl>
                    <FormLabel>{password ?? 'Password'}</FormLabel>
                    <Input type="password" name="password"/>
                </FormControl>
                <Stack gap={4} sx={{mt: 3}}>
                    <Box
                        sx={theme => ({
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            [theme.breakpoints.down('sm')]: {
                                flexDirection: 'column',
                                alignItems: 'flex-start'
                            }
                        })}
                    >
                        <Checkbox size="sm" label={persistent ?? 'Remember me'} name="persistent"/>
                        <Box my={1}/>
                        {forgotPasswordUrl !== undefined && (
                            <Link level="title-sm" href={forgotPasswordUrl}>
                                {forgotPassword ?? 'Forgot your password?'}
                            </Link>
                        )}
                    </Box>
                    <Button type="submit" fullWidth>
                        {submit ?? 'Log in'}
                    </Button>
                </Stack>
            </form>
        </FormModal>
    );
}