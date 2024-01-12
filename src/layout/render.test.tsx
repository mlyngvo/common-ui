import React from 'react';
import {afterEach, describe, expect, it} from '@jest/globals';
import {act} from '@testing-library/react';
import {render} from './render';

afterEach(() => {
    document.body.innerHTML = '';
});

describe('layout tests', () => {
    it('can render application', () => {
        const root = document.createElement('div');
        root.id = 'react-root';
        document.body.append(root);

        act(() => { render(<div>Hello world</div>); });

        expect(document.body.textContent).toMatch('Hello world');
    });

    it('cannot render application', () => {
        const root = document.createElement('div');
        root.id = 'invalid-root';
        document.body.append(root);

        act(() => { render(<div>You do not see me.</div>); });

        expect(document.body.textContent).toMatch('Failed to load application.');
    });
});

