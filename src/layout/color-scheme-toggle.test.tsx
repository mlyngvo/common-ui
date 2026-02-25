import {describe, expect, it} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import React from 'react';

import {ColorSchemeToggle} from './color-scheme-toggle';

describe('color-scheme-toggle test', () => {
    it('can render color-scheme-toggle', () => {
        render(
            <ColorSchemeToggle title="color-scheme" />
        );

        const toggle = screen.getByTitle('color-scheme');
        expect(toggle).toBeVisible();
    });
});

