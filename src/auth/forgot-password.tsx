import {Alert, Box, Button, Link, Stack} from "@mui/material";
import React, {ReactNode, useState} from "react";

import {Input, PasswordInput, VerificationCodeInput} from "../form";
import {isNonBlank} from "../utils/strings";
import {FormDialog} from "./share";

type ForgotPasswordMode = 'Email' | 'Code' | 'Password' | 'Completed';

export interface ForgotPasswordFormData {
    email: string;
    verificationCode?: string;
    newPassword?: string;
    confirmNewPassword?: string;
}

export interface ForgotPasswordProps {
    appTitle: string;
    logo: ReactNode;
    onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
    onRestart: () => void;
    loginUrl?: string;
    loading?: boolean;
    error?: Error;
    i18n?: {
        form?: string;
        email?: string;
        code?: string;
        newPassword?: string;
        confirmPassword?: string;
        restart?: string;
        submit?: string;
        enterCodeMessage?: string;
        successMessage?: string;
        backToLogin?: string;
    };
}

export function ForgotPasswordForm(props: ForgotPasswordProps) {
    const {
        appTitle,
        logo,
        onSubmit,
        onRestart,
        i18n: {
            form: lForm,
            email: lEmail,
            code: lCode,
            newPassword: lNewPassword,
            confirmPassword: lConfirmPassword,
            restart: lRestart,
            submit: lSubmit,
            enterCodeMessage: lEnterCodeMessage,
            successMessage: lSuccessMessage,
            backToLogin: lBackToLogin,
        } = {},
        error,
        loading = false,
        loginUrl,
    } = props;

    const [urlParams] = useState(() => {
        const url = new URLSearchParams(window.location.search);
        return {
            email: url.get('email') ?? '',
            code: url.get('code') ?? '',
        };
    });

    const [mode, setMode] = useState<ForgotPasswordMode>(() => {
        if (isNonBlank(urlParams.email) && isNonBlank(urlParams.code)) return 'Password';
        if (isNonBlank(urlParams.email)) return 'Code';
        return 'Email';
    });
    const [email, setEmail] = useState(urlParams.email);
    const [code, setCode] = useState(urlParams.code);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleSubmit(ev: React.SubmitEvent<HTMLFormElement>) {
        ev.preventDefault();

        let data: ForgotPasswordFormData;
        let nextMode: ForgotPasswordMode | undefined;

        if (mode === 'Email') {
            data = { email };
            nextMode = 'Code';
        }
        else if (mode === 'Code') {
            data = { email, verificationCode: code };
            nextMode = 'Password';
        }
        else {
            data = { email, verificationCode: code, newPassword: password, confirmNewPassword: confirmPassword };
            nextMode = 'Completed';
        }

        onSubmit(data)
            .then(() => { if (nextMode) setMode(nextMode); })
            .catch(console.error);
    }

    function handleRestart() {
        setMode('Email');
        setEmail('');
        setCode('');
        setPassword('');
        setConfirmPassword('');
        onRestart();
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
                            <Alert variant="outlined" severity="info">
                                {lEnterCodeMessage ?? 'We have sent the verification code to your email. Please check your inbox.'}
                            </Alert>
                            <VerificationCodeInput
                                label={lCode ?? 'Verification code'}
                                value={code}
                                onChange={setCode}
                                required
                                disabled={loading}
                            />
                        </>
                    )}
                    {mode === 'Password' && (
                        <>
                            <PasswordInput
                                label={lNewPassword ?? 'New Password'}
                                value={password}
                                onChange={setPassword}
                                required
                                disabled={loading}
                            />
                            <PasswordInput
                                label={lConfirmPassword ?? 'Confirm Password'}
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                required
                                disabled={loading}
                            />
                        </>
                    )}
                    {mode === 'Completed' && (
                        <Alert variant="outlined" severity="success">
                            {lSuccessMessage ?? 'Your password has been changed successfully.'}
                        </Alert>
                    )}
                </Stack>
                <Box my={3} />
                {mode !== 'Completed' && (
                    <Button
                        fullWidth
                        type="submit"
                        size="large"
                        variant="contained"
                        disabled={loading}
                    >
                        {lSubmit ?? 'Submit'}
                    </Button>
                )}
                {!['Email', 'Completed'].includes(mode) && (
                    <>
                        <Box my={1} />
                        <Button
                            fullWidth
                            size="large"
                            variant="outlined"
                            disabled={loading}
                            color="inherit"
                            onClick={handleRestart}
                        >
                            {lRestart ?? 'Restart'}
                        </Button>
                    </>
                )}

                {error !== undefined && (
                    <Alert
                        severity="error"
                        sx={{ mt: 2 }}
                    >
                        {error?.message ?? 'Error'}
                    </Alert>
                )}

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