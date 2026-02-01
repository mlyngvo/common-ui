import {describe, expect, it} from '@jest/globals';
import {act, render, waitFor} from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';

import {DefaultThemeProvider} from "../test-components";
import {CommonDatePicker} from './common-date-picker';

describe('common-date-picker tests', () => {
    it('can render blank date picker', async () => {
        const {container} = render(
            <DefaultThemeProvider>
                <CommonDatePicker label="Date Picker" />
            </DefaultThemeProvider>
        );

        await waitFor(() => {
            const input = container.querySelectorAll('input').item(0);
            expect(input).toBeVisible();
        });
    });

    it('can render date picker with value', async () => {
        const testDate = dayjs();
        const expectedValue = testDate.format('MM/DD/YYYY');
        const {container} = render(
            <DefaultThemeProvider>
                <CommonDatePicker label="Edit Date Picker" DatePickerProps={{ value: testDate }} />
            </DefaultThemeProvider>
        );

        await waitFor(() => {
            const input = container.querySelectorAll('input').item(0);
            expect(input).toHaveValue(expectedValue);
        });
    });

    it('can render locale date picker', async () => {
        const testDate = dayjs().add(5, 'day');
        const expectedValue = testDate.format('MM/DD/YYYY');

        const {container} = await act(() => render(
            <DefaultThemeProvider>
                <CommonDatePicker label="Locale Date Picker" locale="en" DatePickerProps={{ value: testDate }} />
            </DefaultThemeProvider>
        ));

        await waitFor(() => {
            const input = container.querySelectorAll('input').item(0);
            expect(input).toHaveValue(expectedValue);
        });
    });
});