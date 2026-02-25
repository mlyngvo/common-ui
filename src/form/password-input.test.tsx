import {afterEach, describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import {PasswordInput} from './password-input';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('password-input test', () => {
  it('can render with label', () => {
    render(<PasswordInput label="Password" />);

    expect(screen.getByLabelText('Password')).toBeVisible();
  });

  it('renders as password type by default', () => {
    render(<PasswordInput label="Password" />);

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('toggles visibility on icon button click', () => {
    render(<PasswordInput label="Password" />);

    const input = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button');

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('displays controlled value', () => {
    render(<PasswordInput label="Password" value="secret" onChange={() => {}} />);

    expect(screen.getByLabelText('Password')).toHaveValue('secret');
  });

  it('calls onChange when typing', () => {
    const onChange = jest.fn<(value: string) => void>();
    render(<PasswordInput label="Password" value="" onChange={onChange} />);

    const input = screen.getByLabelText('Password');
    fireEvent.change(input, {target: {value: 'abc'}});

    expect(onChange).toHaveBeenCalledWith('abc');
  });

  it('disables input when disabled', () => {
    render(<PasswordInput label="Password" disabled />);

    expect(screen.getByLabelText('Password')).toBeDisabled();
  });

  it('sets required attribute', () => {
    render(<PasswordInput label="Password" required />);

    expect(screen.getByLabelText('Password')).toBeRequired();
  });
});
