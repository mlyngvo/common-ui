import {afterEach, describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import {Checkbox} from './checkbox';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('checkbox test', () => {
  it('can render checkbox with label', () => {
    render(<Checkbox label="Accept terms" />);

    const checkbox = screen.getByRole('checkbox', {name: 'Accept terms'});
    expect(checkbox).toBeInTheDocument();
  });

  it('can call onChange with checked state', () => {
    const onChange = jest.fn();

    render(<Checkbox label="Accept terms" CheckboxProps={{onChange}} />);

    const checkbox = screen.getByRole('checkbox', {name: 'Accept terms'});
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
