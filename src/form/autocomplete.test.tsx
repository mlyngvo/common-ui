import {afterEach, describe, expect, it, jest} from '@jest/globals';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {Autocomplete} from './autocomplete';

afterEach(() => {
    document.body.innerHTML = '';
});

const options = [
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Cherry', value: 'cherry'},
];

describe('autocomplete test', () => {
    it('can render autocomplete with label', () => {
        render(<Autocomplete label="Fruits" options={options} />);

        expect(screen.getByText('Fruits')).toBeVisible();
        expect(screen.getByPlaceholderText('Please select')).toBeInTheDocument();
    });

    it('can show options when clicked', async () => {
        render(<Autocomplete label="Fruits" options={options} />);

        const input = screen.getByRole('combobox');
        await userEvent.click(input);

        await waitFor(() => {
            expect(screen.getByText('Apple')).toBeVisible();
            expect(screen.getByText('Banana')).toBeVisible();
            expect(screen.getByText('Cherry')).toBeVisible();
        });
    });

    it('can call onChange when selecting an option', async () => {
        const onChange = jest.fn();

        render(
            <Autocomplete
                label="Fruits"
                options={options}
                AutocompleteProps={{onChange}}
            />
        );

        const input = screen.getByRole('combobox');
        await userEvent.click(input);

        await waitFor(() => {
            expect(screen.getByText('Banana')).toBeVisible();
        });

        await userEvent.click(screen.getByText('Banana'));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(options[1]);
    });

    it('can call onSearch only when user types', async () => {
        const onSearch = jest.fn();

        render(
            <Autocomplete
                label="Fruits"
                options={options}
                onSearch={onSearch}
            />
        );

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'app');

        await waitFor(() => {
            expect(onSearch).toHaveBeenCalledWith('a');
            expect(onSearch).toHaveBeenCalledWith('ap');
            expect(onSearch).toHaveBeenCalledWith('app');
        });
    });

    it('should not call onSearch when selecting an option', async () => {
        const onSearch = jest.fn();

        render(
            <Autocomplete
                label="Fruits"
                options={options}
                onSearch={onSearch}
            />
        );

        const input = screen.getByRole('combobox');
        await userEvent.click(input);

        await waitFor(() => {
            expect(screen.getByText('Banana')).toBeVisible();
        });

        onSearch.mockClear();

        await userEvent.click(screen.getByText('Banana'));

        expect(onSearch).not.toHaveBeenCalled();
    });

    it('can show loading indicator', () => {
        render(<Autocomplete label="Fruits" options={[]} loading />);

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('can use custom placeholder', () => {
        render(
            <Autocomplete
                label="Fruits"
                options={options}
                i18n={{selectHint: 'Choose a fruit'}}
            />
        );

        expect(screen.getByPlaceholderText('Choose a fruit')).toBeInTheDocument();
    });
});
