import React from 'react';
import {afterEach, describe, expect, it} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import {createPageTitleProvider, PageTitle} from './page-title';

afterEach(() => {
    document.body.innerHTML = '';
});

describe('page-title test', () => {
    const {PageTitleProvider} = createPageTitleProvider('page-title Test');

    it('can render page-title', async () => {
        render(
            <PageTitleProvider>
                <PageTitle title="jest" />
            </PageTitleProvider>
        );

        const titleElement = screen.getByText('jest');
        expect(titleElement).toBeVisible();
    });

    it('can alter document title', async () => {
        render(
            <PageTitleProvider>
                <PageTitle title="the page" />
            </PageTitleProvider>
        );

        expect(global.window.document.title).toBe('the page | page-title Test');
    });
});

