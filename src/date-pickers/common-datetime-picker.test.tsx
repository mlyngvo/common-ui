import {describe, expect, it} from '@jest/globals';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';

import {CommonDateTimePicker} from "./common-datetime-picker";
import {DefaultThemeProvider} from "../test-components";

describe('common-date-time-picker tests', () => {
    it('can render blank date time picker',  async () => {
        const {container} = render(
            <DefaultThemeProvider>
                <CommonDateTimePicker label="Date Time Picker" />
            </DefaultThemeProvider>
        );

        await waitFor(() => {
            const input = container.querySelectorAll('input').item(0);
            expect(input).toBeVisible();
        });
    });

    it('can render date time picker with value', async () => {
        const testDate = dayjs();
        const expectedValue = testDate.format('MM/DD/YYYY hh:mm A');
        const {container} = render(
            <DefaultThemeProvider>
                <CommonDateTimePicker label="Edit Date Time Picker" DateTimePickerProps={{ value: testDate }} />
            </DefaultThemeProvider>
        );

        await waitFor(() => {
            const input = container.querySelectorAll('input').item(0);
            expect(input).toHaveValue(expectedValue);
        });
    });

    it('can render locale date time picker', async () => {
        const testDate = dayjs().add(5, 'day');
        const expectedValue = testDate.format('MM/DD/YYYY hh:mm A');

        const {container} = await act(() => render(
            <DefaultThemeProvider>
                <CommonDateTimePicker label="Locale Date Time Picker" locale="en" DateTimePickerProps={{ value: testDate }} />
            </DefaultThemeProvider>
        ));

        await waitFor(() => {
            const input = container.querySelectorAll('input').item(0);
            expect(input).toHaveValue(expectedValue);
        });
    });
});