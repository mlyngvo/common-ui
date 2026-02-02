// src/display/date-time-display.test.tsx
import React from 'react';
import dayjs from 'dayjs';
import { render, screen } from '@testing-library/react';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { DateTimeDisplay } from './date-time-display';
import {afterEach, describe, expect, it} from "@jest/globals";

dayjs.extend(localizedFormat);

describe('DateTimeDisplay', () => {
    const originalLanguage = navigator.language;

    afterEach(() => {
        Object.defineProperty(window.navigator, 'language', {
            value: originalLanguage,
            configurable: true,
        });
    });

    it('formats date and time using navigator.language by default', () => {
        Object.defineProperty(window.navigator, 'language', { value: 'en', configurable: true });

        const value = '2020-12-25T15:30:00';
        render(<DateTimeDisplay value={value} />);

        const date = dayjs(value).locale(window.navigator.language);
        const expected = `${date.format('ll')}, ${date.format('LT')}`;

        expect(screen.getByText(expected)).toBeInTheDocument();
    });

    it('uses provided locale prop to format date and time', () => {
        Object.defineProperty(window.navigator, 'language', { value: 'en', configurable: true });

        const value = '2020-12-25T15:30:00';
        render(<DateTimeDisplay value={value} locale="fr" />);

        const date = dayjs(value).locale('fr');
        const expected = `${date.format('ll')}, ${date.format('LT')}`;

        expect(screen.getByText(expected)).toBeInTheDocument();
    });
});
