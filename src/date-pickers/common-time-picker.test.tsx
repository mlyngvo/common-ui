import {describe, expect, it} from '@jest/globals';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';

import {CommonTimePicker} from './common-time-picker';
import {DefaultThemeProvider} from "../test-components";

describe('common-time-picker tests', () => {
    it('can render blank time picker', async () => {
        const {container} = render(
            <DefaultThemeProvider>
                <CommonTimePicker label="Time Picker" />
            </DefaultThemeProvider>
        );

        await waitFor(() => {
            const input = container.querySelectorAll('input').item(0);
            expect(input).toBeVisible();
        });
    });

    it('can render time picker with value', async () => {
        const testTime = dayjs();
        const expectedValue = testTime.format('hh:mm A');
        const {container} = render(
            <DefaultThemeProvider>
                <CommonTimePicker label="Edit Time Picker" TimePickerProps={{ value: testTime }} />
            </DefaultThemeProvider>
        );

        await waitFor(() => {
            const input = container.querySelectorAll('input').item(0);
            expect(input).toHaveValue(expectedValue);
        });
    });

    it('can render locale time picker', async () => {
        const testTime = dayjs().add(2, 'hour');
        const expectedValue = testTime.format('hh:mm A');

        const {container} = await act(() => render(
            <DefaultThemeProvider>
                <CommonTimePicker label="Locale Time Picker" locale="en" TimePickerProps={{ value: testTime }} />
            </DefaultThemeProvider>
        ));

        await waitFor(() => {
            const input = container.querySelectorAll('input').item(0);
            expect(input).toHaveValue(expectedValue);
        });
    });
});