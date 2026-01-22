import React from 'react';
import dayjs from 'dayjs';
import {describe, expect, it} from '@jest/globals';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {CommonDateTimePicker} from './common-date-time-picker';

describe('common-date-time-picker tests', () => {
    it('can render blank date time picker',  async () => {
        const {container} = render(<CommonDateTimePicker />);

        await waitFor(() => {
            const input = container.querySelectorAll('input').item(0);
            expect(input).toBeVisible();
        });
    });

    it('can edit date time picker', async () => {
        const {container} = render(<CommonDateTimePicker />);

        const value = dayjs().format('MM/DD/YYYY hh:mm A');
        const input = container.querySelectorAll('input').item(0);
        fireEvent.change(input, { target: { value } });

        await waitFor(() => {
            const valueInput = screen.getByDisplayValue(value);
            expect(valueInput).toBeVisible();
        });
    });

    it('can render blank date time picker', async () => {
        const now = dayjs();

        const {container} = await act(() => render(<CommonDateTimePicker locale="en" value={now} />));

        const value = dayjs().add(2, 'd').format('MM/DD/YYYY hh:mm A');
        const input = container.querySelectorAll('input').item(0);
        fireEvent.change(input, { target: { value } });

        await waitFor(() => {
            const valueInput = screen.getByDisplayValue(value);
            expect(valueInput).toEqual(input);
        });
    });
});