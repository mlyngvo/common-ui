import React, {type ReactElement} from 'react';
import {Alert, Box, Button, FormControl, FormLabel, Input, Link, Stack, Typography} from '@mui/joy';
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
    onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
    verificationMode: boolean;
    newPasswordMode: boolean;
    i18n?: {
        form?: string;
        email?: string;
        code?: string;
        newPassword?: string;
        confirmPassword?: string;
        submit?: string;
        successMessage?: string;
        backToLogin?: string;
    };
    error?: string;
    success?: boolean;
    loading?: boolean;
    loginUrl?: string;
}

export function ForgotPasswordDialog(properties: ForgotPasswordDialogProperties) {
    const {
        appTitle,
        logo,
        onSubmit,
        verificationMode,
        newPasswordMode,
        i18n: {
            form,
            email,
            code,
            newPassword,
            confirmPassword,
            submit,
            successMessage,
            backToLogin,
        } = {},
        error,
        success = false,
        loading = false,
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
        onSubmit(data)
            .catch(console.error);
    }

    return (
        <FormModal
            logo={logo}
            appTitle={appTitle}
            formTitle={form ?? 'Forgot password'}
        >
            {!success && (
                <form onSubmit={handleFormSubmit}>
                    <Box sx={{display: newPasswordMode ? 'none' : 'inherit'}}>
                        <FormControl disabled={loading || verificationMode}>
                            <FormLabel>{email ?? 'Email'}</FormLabel>
                            <Input type="email" name="email"/>
                        </FormControl>
                        {verificationMode && (
                            <>
                                <Box my={3}/>
                                <FormControl disabled={loading}>
                                    <FormLabel>{code ?? 'Verification code'}</FormLabel>
                                    <Input name="verificationCode"/>
                                </FormControl>
                            </>
                        )}
                    </Box>
                    <Box sx={{display: newPasswordMode ? 'inherit' : 'none'}}>
                        <FormControl disabled={loading}>
                            <FormLabel>{newPassword ?? 'New password'}</FormLabel>
                            <Input type="password" name="newPassword"/>
                        </FormControl>
                        <Box my={3}/>
                        <FormControl disabled={loading}>
                            <FormLabel>{confirmPassword ?? 'Confirm password'}</FormLabel>
                            <Input type="password" name="confirmNewPassword"/>
                        </FormControl>
                    </Box>

                    {error !== undefined && (
                        <Alert
                            color="danger"
                            variant="soft"
                            sx={{mt: 2}}
                            startDecorator={<ErrorOutlineRoundedIcon/>}
                        >
                            {error}
                        </Alert>
                    )}

                    <Stack
                        gap={4}
                        alignItems="flex-start"
                        sx={{mt: 3}}
                    >
                        <Button type="submit" fullWidth loading={loading}>
                            {submit ?? 'Submit'}
                        </Button>
                        {loginUrl !== undefined && (
                            <Link level="title-sm" href={loginUrl} startDecorator={<ArrowBackRoundedIcon/>}>
                                {backToLogin ?? 'Back to Login'}
                            </Link>
                        )}
                    </Stack>
                </form>
            )}
            {success && (
                <Stack
                    gap={3}
                    alignItems="flex-start"
                >
                    <Typography>{successMessage ?? 'Successfully reset password. Your can now login.'}</Typography>
                    {loginUrl !== undefined && (
                        <Link level="title-sm" href={loginUrl} startDecorator={<ArrowBackRoundedIcon/>}>
                            {backToLogin ?? 'Back to Login'}
                        </Link>
                    )}
                </Stack>

            )}
        </FormModal>
    );
}