import {useMutation} from "@tanstack/react-query";
import React from "react";
import {useNavigate} from "react-router-dom";

import {Body, Breadcrumbs, PageTitle} from "../../src";
import {ForgotPasswordForm, LoginForm} from "../../src/auth";
import {ForgotPasswordFormData} from "../../src/auth/forgot-password";
import {LoginFormData} from "../../src/auth/login";
import {isNonBlank} from "../../src/utils/strings";
import {Logo} from "../logo";
import {sleep} from "../utils";

export default function AuthPage({forgotPassword = false}: { forgotPassword?: boolean }) {
    const navigate = useNavigate();

    const loginMutate = useMutation({
        mutationFn: async ({password}: LoginFormData) => {
            if (password !== 'admin') throw new Error('Correct password is admin.');
            await sleep(3000);
            console.info('Logged in');
        }
    });

    const forgotPasswordMutate = useMutation({
        mutationFn: async ({email, verificationCode, newPassword, confirmNewPassword}: ForgotPasswordFormData) => {
            if (isNonBlank(newPassword)) {
                if (verificationCode !== '123456') throw new Error('Correct code is 123456.');
                if (newPassword !== confirmNewPassword) throw new Error('Passwords mismatch.');
                console.info('Password changed.');
            }
            else if (isNonBlank(verificationCode)) {
                if (verificationCode !== '123456') throw new Error('Correct code is 123456.');
                console.info('Verification code provided.');
            }
            else {
                if (email !== 'foo@bar.com') throw new Error('Correct email is foo@bar.com.');
                console.info('Email provided.');
            }
            await sleep(1000);
        }
    })

    return (
        <Body
            title={(
                <PageTitle title="Auth" />
            )}
            top={
                <Breadcrumbs
                    onHomeClick={() => navigate('/')}
                    items={[
                        { label: 'Auth' },
                    ]}
                />
            }
        >
            {!forgotPassword && (
                <LoginForm
                    appTitle="Common UI"
                    logo={<Logo />}
                    loading={loginMutate.isPending}
                    error={loginMutate.error ?? undefined}
                    onSubmit={loginMutate.mutateAsync}
                    forgotPasswordUrl="/#/auth/forgot-password"
                />
            )}
            {forgotPassword && (
                <ForgotPasswordForm
                    appTitle="Common UI"
                    logo={<Logo />}
                    loading={forgotPasswordMutate.isPending}
                    error={forgotPasswordMutate.error ?? undefined}
                    onSubmit={forgotPasswordMutate.mutateAsync}
                    onRestart={forgotPasswordMutate.reset}
                    loginUrl="/#/auth"
                />
            )}
        </Body>
    )
}