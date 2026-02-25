import {afterEach, describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import React from 'react';

import {LoginForm, LoginFormData} from './login';

const defaultProps = {
  appTitle: 'Test App',
  logo: <span>Logo</span>,
  onSubmit: jest.fn<(data: LoginFormData) => Promise<void>>().mockResolvedValue(undefined),
};

afterEach(() => {
  document.body.innerHTML = '';
  jest.restoreAllMocks();
});

describe('login form test', () => {
  it('can render with default labels', () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.getByText('Login')).toBeVisible();
    expect(screen.getByLabelText('Email')).toBeVisible();
    expect(screen.getByLabelText('Password')).toBeVisible();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Log in'})).toBeVisible();
  });

  it('can render with custom i18n labels', () => {
    render(
      <LoginForm
        {...defaultProps}
        i18n={{
          form: 'Sign In',
          email: 'E-Mail',
          password: 'Passwort',
          persistent: 'Angemeldet bleiben',
          submit: 'Anmelden',
        }}
      />
    );

    expect(screen.getByText('Sign In')).toBeVisible();
    expect(screen.getByLabelText('E-Mail')).toBeVisible();
    expect(screen.getByLabelText('Passwort')).toBeVisible();
    expect(screen.getByLabelText('Angemeldet bleiben')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Anmelden'})).toBeVisible();
  });

  it('can render logo and app title', () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.getByText('Logo')).toBeVisible();
    expect(screen.getByText('Test App')).toBeVisible();
  });

  it('calls onSubmit with form data', async () => {
    const onSubmit = jest.fn<(data: LoginFormData) => Promise<void>>().mockResolvedValue(undefined);
    render(<LoginForm {...defaultProps} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Email'), {target: {value: 'user@test.com'}});
    fireEvent.change(screen.getByLabelText('Password'), {target: {value: 'secret'}});
    fireEvent.click(screen.getByLabelText('Remember me'));
    fireEvent.submit(screen.getByRole('button', {name: 'Log in'}));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'user@test.com',
        password: 'secret',
        persistent: true,
      });
    });
  });

  it('displays error message', () => {
    render(<LoginForm {...defaultProps} error={new Error('Invalid credentials')} />);

    expect(screen.getByText('Invalid credentials')).toBeVisible();
  });

  it('does not display error when undefined', () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders forgot password link', () => {
    render(<LoginForm {...defaultProps} forgotPasswordUrl="/forgot" />);

    const link = screen.getByText('Forgot your password?');
    expect(link).toBeVisible();
    expect(link.closest('a')).toHaveAttribute('href', '/forgot');
  });

  it('does not render forgot password link when url not provided', () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.queryByText('Forgot your password?')).not.toBeInTheDocument();
  });

  it('disables inputs and button when loading', () => {
    render(<LoginForm {...defaultProps} loading />);

    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByLabelText('Password')).toBeDisabled();
    expect(screen.getByLabelText('Remember me')).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Log in'})).toBeDisabled();
  });
});
