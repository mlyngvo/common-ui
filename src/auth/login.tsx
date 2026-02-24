import {Alert, Box, Button, Link, Stack} from "@mui/material";
import React, {type ReactNode, useState} from "react";

import {Checkbox, Input, PasswordInput} from "../form";
import {FormDialog} from "./share";

export interface LoginFormData {
    email: string;
    password: string;
    persistent: boolean;
}

export interface LoginFormProps {
    appTitle: string;
    logo: ReactNode;
    onSubmit: (data: LoginFormData) => Promise<void>;
    forgotPasswordUrl?: string;
    loading?: boolean;
    error?: Error;
    i18n?: {
        form?: string;
        email?: string;
        password?: string;
        persistent?: string;
        forgotPassword?: string;
        submit?: string;
    };
}

export function LoginForm(props: LoginFormProps) {
    const {
        appTitle,
        logo,
        onSubmit,
        forgotPasswordUrl,
        error,
        loading = false,
        i18n: {
            form: lForm,
            email: lEmail,
            password: lPassword,
            persistent: lPersistent,
            forgotPassword: lForgotPassword,
            submit: lSubmit,
        } = {},
    } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [persistent, setPersistent] = useState(false);
    function handleSubmit(ev: React.SubmitEvent<HTMLFormElement>) {
        ev.preventDefault();
        onSubmit({ email, password, persistent })
            .catch(console.error);
    }

    return (
        <FormDialog
            logo={logo}
            appTitle={appTitle}
            formTitle={lForm ?? 'Login'}
        >
            <form onSubmit={handleSubmit}>
                <Stack
                    gap={2}
                    direction="column"
                >
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
                    <PasswordInput
                        label={lPassword ?? 'Password'}
                        value={password}
                        onChange={setPassword}
                        required
                        disabled={loading}
                    />
                    <Checkbox
                        label={lPersistent ?? 'Remember me'}
                        CheckboxProps={{
                            checked: persistent,
                            onChange: setPersistent,
                            disabled: loading,
                        }}
                    />
                </Stack>
                <Box my={3} />
                <Button
                    fullWidth
                    type="submit"
                    size="large"
                    variant="contained"
                    disabled={loading}
                >
                    {lSubmit ?? 'Log in'}
                </Button>
                {error !== undefined && (
                    <Alert
                        severity="error"
                        sx={{ mt: 2 }}
                    >
                        {error?.message ?? 'Error'}
                    </Alert>
                )}
                {forgotPasswordUrl !== undefined && (
                    <Stack
                        direction="column"
                        alignItems="center"
                        mt={2}
                    >
                        <Link href={forgotPasswordUrl}>
                            {lForgotPassword ?? 'Forgot your password?'}
                        </Link>
                    </Stack>
                )}
            </form>
        </FormDialog>
    )
}