import {describe, expect, it} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import React from 'react';

import {ErrorBoundary} from './error-boundary';

function ErrorBlock() {
    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        <div>{({} as any).bar[2]}</div>
    );
}

describe('error-boundary test', () => {
    it('can render error boundary', () => {
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