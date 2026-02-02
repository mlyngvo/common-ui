// src/display/date-display.test.tsx
import React from 'react';
import dayjs from 'dayjs';
import { render, screen } from '@testing-library/react';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { DateDisplay } from './date-display';
import {afterEach, describe, expect, it} from "@jest/globals";

dayjs.extend(localizedFormat);

describe('DateDisplay', () => {
    const originalLanguage = navigator.language;

    afterEach(() => {
        // restore original navigator.language
        Object.defineProperty(window.navigator, 'language', {
            value: originalLanguage,
            configurable: true,
        });
    });

    it('formats date using navigator.language by default', () => {
        Object.defineProperty(window.navigator, 'language', { value: 'en', configurable: true });

        const value = '2020-12-25';
        render(<DateDisplay value={value} />);

        const expected = dayjs(value).locale(window.navigator.language).format('ll');
        expect(screen.getByText(expected)).toBeInTheDocument();
    });

    it('uses provided locale prop to format date', () => {
        Object.defineProperty(window.navigator, 'language', { value: 'en', configurable: true });

        const value = '2020-12-25';
        render(<DateDisplay value={value} locale="fr" />);

        const expected = dayjs(value).locale('fr').format('ll');
        expect(screen.getByText(expected)).toBeInTheDocument();
    });
});
