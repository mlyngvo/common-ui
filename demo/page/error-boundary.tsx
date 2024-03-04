import React, {useEffect, useState} from 'react';
import {Typography} from '@mui/joy';
import {ErrorBoundary} from '../../src';

function ErrorContent() {

    useEffect(() => {
        let foo: any;
        const {bar} = foo;
        console.error('bar', bar);
    }, []);

    return (
        <div>
            <Typography level="h1">YOU CAN&apos;T SEE ME</Typography>
            <img src="https://i.imgur.com/TaLcpjR.jpg" alt="THE TIME IS NOW"/>
        </div>
    );
}

export function DemoErrorBoundary() {
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        localStorage.setItem('secret', 'very-strong-password');
        localStorage.setItem('publicKey', 'you-can-read-this-key-1234');
        setShowError(true);
    }, []);

    return (
        <ErrorBoundary
            anonymizeStorageKeyPatterns={['secret']}
        >
            {showError && <ErrorContent />}
        </ErrorBoundary>
    );
}