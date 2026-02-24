import React, {ReactNode, useEffect, useMemo, useState} from "react";
import {FormDialog} from "./share";
import {Input} from "../form";
import {Alert, Box, Button, Link, Stack} from "@mui/material";
import {isNonBlank} from "../utils/strings";

type ForgotPasswordMode = 'Email' | 'Code' | 'Password';

interface ForgotPasswordFormData {
    email: string;
    verificationCode?: string;
    newPassword?: string;
    confirmNewPassword?: string;
}

export interface ForgotPasswordProps {
    appTitle: string;
    logo: ReactNode;
    onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
    loginUrl?: string;
    loading?: boolean;
    error?: Error;
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
}

export function ForgotPasswordForm(props: ForgotPasswordProps) {
    const {
        appTitle,
        logo,
        onSubmit,
        i18n: {
            form: lForm,
            email: lEmail,
            code: lCode,
            newPassword: lNewPassword,
            confirmPassword: lConfirmPassword,
            submit: lSubmit,
            successMessage: lSuccessMessage,
            backToLogin: lBackToLogin,
        } = {},
        error,
        loading = false,
        loginUrl,
    } = props;

    const [mode, setMode] = useState<ForgotPasswordMode>('Email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        const url = new URLSearchParams(window.location.search);
        const email = url.get('email');
        const code = url.get('code');
        if (isNonBlank(email)) setEmail(email);
        if (isNonBlank(code)) setCode(code);
        if (isNonBlank(email) && isNonBlank(code)) {
            setMode('Password');
        }
        else if (isNonBlank(email)) {
            setMode('Code')
        }
        else {
            setMode('Email');
        }
    }, []);

    function handleSubmit(ev: React.SubmitEvent<HTMLFormElement>) {
        ev.preventDefault();

        if (mode === 'Email') {
            onSubmit({ email })
                .then(() => setMode('Code'))
                .catch(console.error);
        }
        else if (mode === 'Code') {
            onSubmit({ email, verificationCode: code })
                .then(() => setMode('Password'))
                .catch(console.error);
        }
        else {
            onSubmit({ email, newPassword: '', confirmNewPassword: '' })
                .catch(console.error);
        }
    }

    return (
        <FormDialog
            logo={logo}
            appTitle={appTitle}
            formTitle={lForm ?? 'Forgot Password'}
        >
            <form onSubmit={handleSubmit}>
                <Stack
                    gap={2}
                    direction="column"
                >
                    {mode === 'Email' && (
                        <Input
                            label={lEmail ?? 'Email'}
                            InputProps={{
                                required: true,
                                type: 'email',
                                value: email,
                                onChange: setEmail,
                                disabled: loading,
                            }}
                        />
                    )}
                    {mode === 'Code' && (
                        <>
                            <Alert>
                                We have sent the verification code to your email. Please check your inbox.
                            </Alert>
                            <Input
                                label={lCode ?? 'Verification code'}
                                InputProps={{
                                    required: true,
                                    value: code,
                                    onChange: setCode,
                                }}
                            />
                        </>
                    )}
                </Stack>
                <Box my={3} />
                <Button
                    fullWidth
                    type="submit"
                    size="large"
                    variant="contained"
                    disabled={loading}
                >
                    {lSubmit ?? 'Submit'}
                </Button>
                {loginUrl !== undefined && (
                    <Stack
                        direction="column"
                        alignItems="center"
                        mt={2}
                    >
                        <Link href={loginUrl}>
                            {lBackToLogin ?? 'Back to login'}
                        </Link>
                    </Stack>
                )}
            </form>
        </FormDialog>
    )
}