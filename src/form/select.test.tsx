import {afterEach, describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render, screen, within} from '@testing-library/react';
import React from 'react';

import {Select} from './select';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('select test', () => {
  it('can render select with label and helper text', () => {
    render(
      <Select
        label="Country"
        helperText="Pick one"
        options={[
          {label: 'Denmark', value: 'dk'},
          {label: 'Sweden', value: 'se'},
        ]}
      />
    );

    expect(screen.getByText('Country')).toBeVisible();
    expect(screen.getByText('Pick one')).toBeVisible();
  });

  it('can open the menu by clicking the label and select an option', () => {
    const onChange = jest.fn();

    render(
      <Select
        label="Country"
        options={[
          {label: 'Denmark', value: 'dk'},
          {label: 'Sweden', value: 'se'},
        ]}
        SelectProps={{onChange}}
      />
    );

    fireEvent.click(screen.getByText('Country'));

    // MUI renders the menu in a portal; querying by role works fine in RTL.
    const listbox = screen.getByRole('listbox');
    fireEvent.click(within(listbox).getByText('Sweden'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('se');
  });

  it('can clear selection (calls onChange(undefined))', () => {
    const onChange = jest.fn();

    render(
      <Select
        label="Country"
        options={[
          {label: 'Denmark', value: 'dk'},
          {label: 'Sweden', value: 'se'},
        ]}
        SelectProps={{onChange}}
      />
    );

    fireEvent.click(screen.getByText('Country'));
    fireEvent.click(within(screen.getByRole('listbox')).getByText('Denmark'));

    // After choosing a value, the clear IconButton is rendered.
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('shows loading state (disabled + progressbar)', () => {
    render(
      <Select
        label="Country"
        loading={true}
        options={[
          {label: 'Denmark', value: 'dk'},
          {label: 'Sweden', value: 'se'},
        ]}
      />
    );

    // CircularProgress renders with role="progressbar"
    expect(screen.getByRole('progressbar')).toBeVisible();
    // The trigger for MUI Select is a combobox element.
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true');
  });
});
