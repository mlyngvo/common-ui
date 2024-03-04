import React from 'react';
import dayjs from 'dayjs';
import {describe, expect, it} from '@jest/globals';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {CommonDatePicker} from './common-date-picker';

describe('common-date-picker tests', () => {
    it('can render blank date picker', async () => {
        render(<CommonDatePicker label="Blank Date Picker" />);

        await waitFor(() => {
            const labelInput = screen.getByLabelText('Blank Date Picker');
            expect(labelInput).toBeVisible();
        });
    });

    it('can edit date picker', async () => {
        render(<CommonDatePicker label="Edit Date Picker" />);

        const value = dayjs().format('MM/DD/YYYY');
        const input = screen.getByLabelText('Edit Date Picker');
        fireEvent.change(input, { target: { value } });

        await waitFor(() => {
            const valueInput = screen.getByDisplayValue(value);
            expect(valueInput).toBeVisible();
        });
    });

    it('can render blank date picker', async () => {
        const now = dayjs();

        await act(() => render(<CommonDatePicker label="Common Date Picker" locale="en" value={now} />));

        const value = dayjs().add(2, 'd').format('MM/DD/YYYY');
        const labelInput = screen.getByLabelText('Common Date Picker');
        fireEvent.change(labelInput, { target: { value } });

        await waitFor(() => {
            const valueInput = screen.getByDisplayValue(value);
            expect(valueInput).toEqual(labelInput);
        });
    });
});