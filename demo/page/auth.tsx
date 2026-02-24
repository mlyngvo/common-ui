import React from "react";
import {useNavigate} from "react-router-dom";

import {Body, Breadcrumbs, PageTitle} from "../../src";
import {ForgotPasswordForm, LoginForm} from "../../src/auth";
import {Logo} from "../logo";

export default function AuthPage() {
    const navigate = useNavigate();

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
            {/*<LoginForm*/}
            {/*    appTitle="Common UI"*/}
            {/*    logo={<Logo />}*/}
            {/*    onSubmit={async () => {}}*/}
            {/*    forgotPasswordUrl="/#/auth/forgot-password"*/}
            {/*    error={new Error('Test error.')}*/}
            {/*/>*/}
            <ForgotPasswordForm
                appTitle="Common UI"
                logo={<Logo />}
                onSubmit={async () => {}}
                loginUrl="/#/auth"
            />
        </Body>
    )
}