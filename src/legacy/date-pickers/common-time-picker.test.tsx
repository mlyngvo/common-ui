import React from 'react';
import dayjs from 'dayjs';
import {describe, expect, it} from '@jest/globals';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {CommonTimePicker} from './common-time-picker';

describe('common-time-picker tests', () => {
    it('can render blank time picker', async () => {
        const {container} = render(<CommonTimePicker />);

        await waitFor(() => {
            const input = container.querySelectorAll('input').item(0);
            expect(input).toBeVisible();
        });
    });

    it('can edit time picker', async () => {
        const {container} = render(<CommonTimePicker />);

        const value = dayjs().format('hh:mm A');
        const input = container.querySelectorAll('input').item(0);
        fireEvent.change(input, { target: { value } });

        await waitFor(() => {
            const valueInput = screen.getByDisplayValue(value);
            expect(valueInput).toBeVisible();
        });
    });

    it('can render blank time picker', async () => {
        const now = dayjs();

        const {container} = await act(() => render(<CommonTimePicker locale="en" value={now} />));

        const value = dayjs().add(2, 'd').format('hh:mm A');
        const input = container.querySelectorAll('input').item(0);
        fireEvent.change(input, { target: { value } });

        await waitFor(() => {
            const valueInput = screen.getByDisplayValue(value);
            expect(valueInput).toEqual(input);
        });
    });
});