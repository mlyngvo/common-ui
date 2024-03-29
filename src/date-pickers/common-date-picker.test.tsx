import React from 'react';
import dayjs from 'dayjs';
import {describe, expect, it} from '@jest/globals';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {CommonDatePicker} from './common-date-picker';
import {FormControl, FormLabel} from "@mui/joy";

describe('common-date-picker tests', () => {
    it('can render blank date picker', async () => {
        const {container} = render(
            <FormControl id="blank-date-picker">
                <FormLabel>Blank Date Picker</FormLabel>
                <CommonDatePicker />
            </FormControl>
        );

        await waitFor(() => {
            const input = container.getElementsByTagName('input').item(0);
            expect(input).toBeVisible();
        });
    });

    it('can edit date picker', async () => {
        const {container} = render(
            <FormControl id="edit-date-picker">
                <FormLabel>Edit Date Picker</FormLabel>
                <CommonDatePicker />
            </FormControl>
        );

        const value = dayjs().format('MM/DD/YYYY');
        const input = container.getElementsByTagName('input').item(0);
        fireEvent.change(input!, { target: { value } });

        await waitFor(() => {
            const valueInput = screen.getByDisplayValue(value);
            expect(valueInput).toBeVisible();
        });
    });

    it('can render date picker', async () => {
        const now = dayjs();

        const {container} = await act(() => render(
            <FormControl id="date-picker">
                <FormLabel>Date Picker</FormLabel>
                <CommonDatePicker locale="en" value={now} />
            </FormControl>
        ));

        const value = dayjs().add(2, 'd').format('MM/DD/YYYY');
        const input = container.getElementsByTagName('input').item(0);
        fireEvent.change(input!, { target: { value } });

        await waitFor(() => {
            const valueInput = screen.getByDisplayValue(value);
            expect(valueInput).toEqual(input);
        });
    });
});