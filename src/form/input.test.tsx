import {afterEach, describe, expect, it} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import {Input} from './input';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('input test', () => {
  it('can render input with label', () => {
    render(<Input label="Name" />);

    const input = screen.getByLabelText('Name');
    expect(input).toBeVisible();
  });

  it('can type into input (uncontrolled TextField)', () => {
    render(<Input label="Name" />);

    const input = screen.getByLabelText('Name');
    fireEvent.change(input, {target: {value: 'Alice'}});

    expect(input).toHaveValue('Alice');
  });

  it('can forward TextField props', () => {
    render(
      <Input
        label="Email"
        InputProps={{
          placeholder: 'you@example.com',
          disabled: true,
        }}
      />
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('placeholder', 'you@example.com');
    expect(input).toBeDisabled();
  });
});
