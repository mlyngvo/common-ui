import React from 'react';
import {describe, expect, it} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import {ErrorBoundary} from './error-boundary';

function ErrorBlock() {
    return (
        <div>{({} as any).bar[2]}</div>
    );
}

describe('error-boundary test', () => {
    it('can render error boundary', async () => {
        render(
            <ErrorBoundary
                anonymizeStorageKeyPatterns={['auth']}
            >
                <ErrorBlock />
            </ErrorBoundary>
        );

        const errorLabel = screen.getByText('Oops, something went wrong!');
        expect(errorLabel).toBeVisible();
    });
});