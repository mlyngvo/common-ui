import {afterEach, describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import {VerificationCodeInput} from './verification-code-input';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('verification-code-input test', () => {
  it('can render with label', () => {
    render(<VerificationCodeInput label="Code" />);

    expect(screen.getByText('Code')).toBeVisible();
  });

  it('renders 6 inputs by default', () => {
    render(<VerificationCodeInput label="Code" id="vc" />);

    for (let i = 0; i < 6; i++) {
      expect(document.getElementById(`vc-${i}`)).toBeInTheDocument();
    }
  });

  it('renders custom length', () => {
    render(<VerificationCodeInput label="Code" id="vc" length={4} />);

    for (let i = 0; i < 4; i++) {
      expect(document.getElementById(`vc-${i}`)).toBeInTheDocument();
    }
    expect(document.getElementById('vc-4')).not.toBeInTheDocument();
  });

  it('displays value across inputs', () => {
    render(<VerificationCodeInput label="Code" id="vc" value="123456" />);

    for (let i = 0; i < 6; i++) {
      expect(document.getElementById(`vc-${i}`)).toHaveValue(String(i + 1));
    }
  });

  it('calls onChange when typing a character', () => {
    const onChange = jest.fn<(value: string) => void>();
    render(<VerificationCodeInput label="Code" id="vc" value="" onChange={onChange} />);

    const firstInput = document.getElementById('vc-0')!;
    fireEvent.change(firstInput, {target: {value: '1'}});

    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('moves focus to next input on change', () => {
    render(<VerificationCodeInput label="Code" id="vc" value="" onChange={() => {}} />);

    const firstInput = document.getElementById('vc-0')!;
    fireEvent.change(firstInput, {target: {value: '1'}});

    expect(document.getElementById('vc-1')).toHaveFocus();
  });

  it('handles backspace on empty input by clearing previous and focusing it', () => {
    const onChange = jest.fn<(value: string) => void>();
    render(<VerificationCodeInput label="Code" id="vc" value="12" onChange={onChange} />);

    const thirdInput = document.getElementById('vc-2')!;
    fireEvent.keyDown(thirdInput, {key: 'Backspace'});

    expect(onChange).toHaveBeenCalledWith('1');
    expect(document.getElementById('vc-1')).toHaveFocus();
  });

  it('handles backspace on filled input by clearing it', () => {
    const onChange = jest.fn<(value: string) => void>();
    render(<VerificationCodeInput label="Code" id="vc" value="123" onChange={onChange} />);

    const secondInput = document.getElementById('vc-1')!;
    fireEvent.keyDown(secondInput, {key: 'Backspace'});

    expect(onChange).toHaveBeenCalledWith('13');
  });

  it('handles paste', () => {
    const onChange = jest.fn<(value: string) => void>();
    render(<VerificationCodeInput label="Code" id="vc" value="" onChange={onChange} />);

    const firstInput = document.getElementById('vc-0')!;
    fireEvent.paste(firstInput, {
      clipboardData: {getData: () => '123456'},
    });

    expect(onChange).toHaveBeenCalledWith('123456');
  });

  it('truncates paste to length', () => {
    const onChange = jest.fn<(value: string) => void>();
    render(<VerificationCodeInput label="Code" id="vc" value="" length={4} onChange={onChange} />);

    const firstInput = document.getElementById('vc-0')!;
    fireEvent.paste(firstInput, {
      clipboardData: {getData: () => '123456'},
    });

    expect(onChange).toHaveBeenCalledWith('1234');
  });

  it('disables all inputs when disabled', () => {
    render(<VerificationCodeInput label="Code" id="vc" disabled />);

    for (let i = 0; i < 6; i++) {
      expect(document.getElementById(`vc-${i}`)).toBeDisabled();
    }
  });

  it('sets required on first input only', () => {
    render(<VerificationCodeInput label="Code" id="vc" required />);

    expect(document.getElementById('vc-0')).toBeRequired();
    expect(document.getElementById('vc-1')).not.toBeRequired();
  });
});
