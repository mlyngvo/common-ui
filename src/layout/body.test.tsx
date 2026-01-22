import React from 'react';
import {afterEach, describe, expect, it} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import {Body} from './body';
import { Typography } from '@mui/material';

afterEach(() => {
    document.body.innerHTML = '';
});

describe('body tests', () => {
    it('can render body', async () => {
        render(
            <Body
                top={<Typography variant="body2">Top body</Typography>}
                title={<Typography variant="h1">The body</Typography>}
            >
                <Typography>Simple body.</Typography>
            </Body>
        );

        const topElement = screen.getByText('Top body');
        const titleElement = screen.getByText('The body');
        const textElement = screen.getByText('Simple body.');
        expect(topElement).toBeVisible();
        expect(titleElement).toBeVisible();
        expect(textElement).toBeVisible();
    });

    it('can render body state', async () => {
        render(
            <Body
                title={<Typography variant="h1">The body</Typography>}
                loading={true}
                error={new Error('Layout error for testing purpose.')}
            >
                <Typography>Simple body.</Typography>
            </Body>
        );

        const errorElement = screen.getByText('Layout error for testing purpose.');
        expect(errorElement).toBeVisible();
    });
});

