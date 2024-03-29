import React from 'react';
import dayjs from 'dayjs';
import {describe, expect, it} from '@jest/globals';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {CommonDateTimePicker} from './common-date-time-picker';

describe('common-date-time-picker tests', () => {
    it('can render blank date time picker',  async () => {
        render(<CommonDateTimePicker label="Blank Date Time Picker" />);

        await waitFor(() => {
            const labelInput = screen.getByLabelText('Blank Date Time Picker');
            expect(labelInput).toBeVisible();
        });
    });

    it('can edit date time picker', async () => {
        render(<CommonDateTimePicker label="Edit Date Time Picker" />);

        const value = dayjs().format('MM/DD/YYYY hh:mm A');
        const input = screen.getByLabelText('Edit Date Time Picker');
        fireEvent.change(input, { target: { value } });

        await waitFor(() => {
            const valueInput = screen.getByDisplayValue(value);
            expect(valueInput).toBeVisible();
        });
    });

    it('can render blank date time picker', async () => {
        const now = dayjs();

        await act(() => render(<CommonDateTimePicker label="Common Date Time Picker" locale="en" value={now} />));

        const value = dayjs().add(2, 'd').format('MM/DD/YYYY hh:mm A');
        const labelInput = screen.getByLabelText('Common Date Time Picker');
        fireEvent.change(labelInput, { target: { value } });

        await waitFor(() => {
            const valueInput = screen.getByDisplayValue(value);
            expect(valueInput).toEqual(labelInput);
        });
    });
});