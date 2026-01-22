import React from 'react';
import {afterEach, describe, expect, it} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import {Body} from './body';
import { Typography } from '@mui/material';
import {Breadcrumbs} from './breadcrumbs';
import {ColorSchemeToggle} from './color-scheme-toggle';

describe('color-scheme-toggle test', () => {
    it('can render color-scheme-toggle', async () => {
        render(
            <ColorSchemeToggle title="color-scheme" />
        );

        const toggle = screen.getByTitle('color-scheme');
        expect(toggle).toBeVisible();
    });
});

