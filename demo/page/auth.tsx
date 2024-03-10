import React, {useState} from 'react';
import {Logo} from '../logo';
import {LoginDialog, ForgotPasswordDialog, ForgotPasswordFormData} from '../../src';
import {useFlag} from '../../src/utils';

export function DemoAuthLogin() {
    return (
        <LoginDialog
            appTitle="Common UI"
            logo={<Logo />}
            onSubmit={console.info}
            formText={{
                submit: 'Sign in'
            }}
            forgotPasswordUrl="/#/auth/forgot"
        />
    );
}

export function DemoAuthForgotPassword() {
    const [verificationMode, setVerificationMode] = useFlag(false);
    const [passMode, setPasswordMode] = useFlag(false);
    const [label, setLabel] = useState('Next');

    function handleSubmit(data: ForgotPasswordFormData) {
        if (!verificationMode) setVerificationMode();
        else if (!passMode) {
            setPasswordMode();
            setLabel('Reset password');
        }
        console.info(data);
    }

    return (
        <ForgotPasswordDialog
            appTitle="Common UI"
            logo={<Logo />}
            onSubmit={data => { handleSubmit(data); }}
            verificationMode={verificationMode}
            newPasswordMode={passMode}
            formText={{
                submit: label
            }}
            loginUrl="/#/auth/login"
        />
    );
}