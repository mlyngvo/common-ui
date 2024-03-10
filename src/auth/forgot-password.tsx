import React, {type ReactElement} from 'react';
import {Alert, Box, Button, FormControl, FormLabel, Input, Link, Stack} from '@mui/joy';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {FormModal} from './modal';

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    verificationCode: HTMLInputElement;
    newPassword: HTMLInputElement;
    confirmNewPassword: HTMLInputElement;
}

interface ForgotPasswordFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export interface ForgotPasswordFormData {
    email: string;
    verificationCode?: string;
    newPassword?: string;
    confirmNewPassword?: string;
}

interface ForgotPasswordDialogProperties {
    appTitle: string;
    logo: ReactElement;
    onSubmit: (data: ForgotPasswordFormData) => void;
    verificationMode: boolean;
    newPasswordMode: boolean;
    formText?: {
        form?: string;
        email?: string;
        code?: string;
        newPassword?: string;
        confirmPassword?: string;
        submit?: string;
        backToLogin?: string;
    };
    error?: string;
    loginUrl?: string;
}

export function ForgotPasswordDialog(properties: ForgotPasswordDialogProperties) {
    const {
        appTitle,
        logo,
        onSubmit,
        verificationMode,
        newPasswordMode,
        formText: {
            form,
            email,
            code,
            newPassword,
            confirmPassword,
            submit,
            backToLogin,
        } = {},
        error,
        loginUrl,
    } = properties;

    function handleFormSubmit(event: React.FormEvent<ForgotPasswordFormElement>) {
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        const data: ForgotPasswordFormData = {
            email: formElements.email.value,
        };
        if (verificationMode) {
            data.verificationCode = formElements.verificationCode.value;
        }
        if (newPasswordMode) {
            data.newPassword = formElements.newPassword.value;
            data.confirmNewPassword = formElements.confirmNewPassword.value;
        }
        onSubmit(data);
    }

    return (
        <FormModal
            logo={logo}
            appTitle={appTitle}
            formTitle={form ?? 'Forgot password'}
        >
            <form onSubmit={handleFormSubmit}>
                <Box sx={{ display: newPasswordMode ? 'none' : 'inherit' }}>
                    <FormControl disabled={verificationMode}>
                        <FormLabel>{email ?? 'Email'}</FormLabel>
                        <Input type="email" name="email" />
                    </FormControl>
                    {verificationMode && (
                        <>
                            <Box my={3}/>
                            <FormControl>
                                <FormLabel>{code ?? 'Verification code'}</FormLabel>
                                <Input name="verificationCode" />
                            </FormControl>
                        </>
                    )}
                </Box>
                <Box sx={{ display: newPasswordMode ? 'inherit' : 'none' }}>
                    <FormControl>
                        <FormLabel>{newPassword ?? 'New password'}</FormLabel>
                        <Input type="password" name="newPassword" />
                    </FormControl>
                    <Box my={3}/>
                    <FormControl>
                        <FormLabel>{confirmPassword ?? 'Confirm password'}</FormLabel>
                        <Input type="password" name="confirmNewPassword" />
                    </FormControl>
                </Box>

                {error !== undefined && (
                    <Alert
                        color="danger"
                        variant="soft"
                        sx={{ mt: 2 }}
                        startDecorator={<ErrorOutlineRoundedIcon />}
                    >
                        {error}
                    </Alert>
                )}

                <Stack gap={4} sx={{mt: 3}}>
                    <Button type="submit" fullWidth>
                        {submit ?? 'Submit'}
                    </Button>
                    {loginUrl !== undefined && (
                        <Link level="title-sm" href={loginUrl} startDecorator={<ArrowBackRoundedIcon />}>
                            {backToLogin ?? 'Back to Login'}
                        </Link>
                    )}
                </Stack>
            </form>
        </FormModal>
    );
}