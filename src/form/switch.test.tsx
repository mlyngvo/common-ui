import {afterEach, describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import {Switch} from './switch';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('switch test', () => {
  it('can render switch with label', () => {
    render(<Switch label="Enable notifications" />);

    const switchInput = screen.getByRole('switch', {name: 'Enable notifications'});
    expect(switchInput).toBeInTheDocument();
  });

  it('can call onChange with checked state', () => {
    const onChange = jest.fn();

    render(<Switch label="Enable notifications" SwitchProps={{onChange}} />);

    const switchInput = screen.getByRole('switch', {name: 'Enable notifications'});
    fireEvent.click(switchInput);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('can render switch with checked state', () => {
    render(<Switch label="Enable notifications" SwitchProps={{checked: true}} />);

    const switchInput = screen.getByRole('switch', {name: 'Enable notifications'});
    expect(switchInput).toBeChecked();
  });

  it('can forward SwitchProps', () => {
    render(
      <Switch
        label="Enable notifications"
        SwitchProps={{
          disabled: true,
        }}
      />
    );

    const switchInput = screen.getByRole('switch', {name: 'Enable notifications'});
    expect(switchInput).toBeDisabled();
  });

  it('can use custom id', () => {
    render(<Switch label="Enable notifications" id="custom-switch-id" />);

    const switchInput = screen.getByRole('switch', {name: 'Enable notifications'});
    expect(switchInput).toHaveAttribute('id', 'custom-switch-id');
  });
});
