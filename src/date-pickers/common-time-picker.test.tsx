import React from 'react';
import dayjs from 'dayjs';
import {describe, expect, it} from '@jest/globals';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {CommonTimePicker} from './common-time-picker';

describe('common-time-picker tests', () => {
    it('can render blank time picker', async () => {
        render(<CommonTimePicker label="Blank Time Picker" />);

        await waitFor(() => {
            const labelInput = screen.getByLabelText('Blank Time Picker');
            expect(labelInput).toBeVisible()
        });
    });

    it('can edit time picker', async () => {
        render(<CommonTimePicker label="Edit Time Picker" />);

        const value = dayjs().format('hh:mm A');
        const input = screen.getByLabelText('Edit Time Picker');
        fireEvent.change(input, { target: { value } });

        await waitFor(() => {
            const valueInput = screen.getByDisplayValue(value);
            expect(valueInput).toBeVisible()
        });
    });

    it('can render blank time picker', async () => {
        const now = dayjs();

        await act(() => render(<CommonTimePicker label="Common Time Picker" locale="en" value={now} />));

        const valueText = dayjs().add(2, 'd').format('hh:mm A');
        const labelInput = screen.getByLabelText('Common Time Picker');
        fireEvent.change(labelInput, { target: { value: valueText } });

        await waitFor(() => {
            const valueInput = screen.getByDisplayValue(valueText);
            expect(valueInput).toEqual(labelInput);
        });
    });
});