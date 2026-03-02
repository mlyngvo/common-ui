import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import React from 'react';

import {ForgotPasswordForm, ForgotPasswordFormData} from './forgot-password';

const defaultProps = {
  appTitle: 'Test App',
  logo: <span>Logo</span>,
  onSubmit: jest.fn<(data: ForgotPasswordFormData) => Promise<void>>().mockResolvedValue(undefined),
  onRestart: jest.fn(),
};

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

afterEach(() => {
  document.body.innerHTML = '';
  jest.restoreAllMocks();
});

describe('forgot-password form test', () => {
  // --- Rendering ---

  it('can render Email mode with default labels', () => {
    render(<ForgotPasswordForm {...defaultProps} />);

    expect(screen.getByText('Forgot Password')).toBeVisible();
    expect(screen.getByLabelText('Email')).toBeVisible();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeVisible();
    expect(screen.queryByRole('button', {name: 'Restart'})).not.toBeInTheDocument();
  });

  it('can render logo and app title', () => {
    render(<ForgotPasswordForm {...defaultProps} />);

    expect(screen.getByText('Logo')).toBeVisible();
    expect(screen.getByText('Test App')).toBeVisible();
  });

  it('can render with custom i18n labels', () => {
    render(
      <ForgotPasswordForm
        {...defaultProps}
        i18n={{
          form: 'Passwort vergessen',
          email: 'E-Mail',
          submit: 'Absenden',
          backToLogin: 'Zur\u00fcck',
        }}
        loginUrl="/login"
      />
    );

    expect(screen.getByText('Passwort vergessen')).toBeVisible();
    expect(screen.getByLabelText('E-Mail')).toBeVisible();
    expect(screen.getByRole('button', {name: 'Absenden'})).toBeVisible();
    expect(screen.getByText('Zur\u00fcck')).toBeVisible();
  });

  // --- URL param initialization ---

  it('initializes to Code mode when email is in URL params', () => {
    window.history.pushState({}, '', '/?email=user%40test.com');
    render(<ForgotPasswordForm {...defaultProps} />);

    expect(screen.getByText(/sent the verification code/i)).toBeVisible();
    expect(screen.getByRole('button', {name: 'Restart'})).toBeVisible();
  });

  it('initializes to Password mode when email and code are in URL params', () => {
    window.history.pushState({}, '', '/?email=user%40test.com&code=123456');
    render(<ForgotPasswordForm {...defaultProps} />);

    expect(screen.getByLabelText('New Password')).toBeVisible();
    expect(screen.getByLabelText('Confirm Password')).toBeVisible();
  });

  // --- Email step ---

  it('submits email and advances to Code mode', async () => {
    const onSubmit = jest.fn<(data: ForgotPasswordFormData) => Promise<void>>().mockResolvedValue(undefined);
    render(<ForgotPasswordForm {...defaultProps} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Email'), {target: {value: 'user@test.com'}});
    fireEvent.submit(screen.getByRole('button', {name: 'Submit'}));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({email: 'user@test.com'});
    });

    await waitFor(() => {
      expect(screen.getByText(/sent the verification code/i)).toBeVisible();
    });
  });

  // --- Code step ---

  it('submits code and advances to Password mode', async () => {
    window.history.pushState({}, '', '/?email=user%40test.com');
    const onSubmit = jest.fn<(data: ForgotPasswordFormData) => Promise<void>>().mockResolvedValue(undefined);
    render(<ForgotPasswordForm {...defaultProps} onSubmit={onSubmit} />);

    fireEvent.submit(screen.getByRole('button', {name: 'Submit'}));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'user@test.com',
        verificationCode: '',
      });
    });

    await waitFor(() => {
      expect(screen.getByLabelText('New Password')).toBeVisible();
    });
  });

  // --- Password step ---

  it('submits passwords and advances to Completed mode', async () => {
    window.history.pushState({}, '', '/?email=user%40test.com&code=123456');
    const onSubmit = jest.fn<(data: ForgotPasswordFormData) => Promise<void>>().mockResolvedValue(undefined);
    render(<ForgotPasswordForm {...defaultProps} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('New Password'), {target: {value: 'newpass'}});
    fireEvent.change(screen.getByLabelText('Confirm Password'), {target: {value: 'newpass'}});
    fireEvent.submit(screen.getByRole('button', {name: 'Submit'}));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'user@test.com',
        verificationCode: '123456',
        newPassword: 'newpass',
        confirmNewPassword: 'newpass',
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/password has been changed successfully/i)).toBeVisible();
    });
  });

  it('hides submit button in Completed mode', async () => {
    window.history.pushState({}, '', '/?email=user%40test.com&code=123456');
    const onSubmit = jest.fn<(data: ForgotPasswordFormData) => Promise<void>>().mockResolvedValue(undefined);
    render(<ForgotPasswordForm {...defaultProps} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('New Password'), {target: {value: 'p'}});
    fireEvent.change(screen.getByLabelText('Confirm Password'), {target: {value: 'p'}});
    fireEvent.submit(screen.getByRole('button', {name: 'Submit'}));

    await waitFor(() => {
      expect(screen.queryByRole('button', {name: 'Submit'})).not.toBeInTheDocument();
    });
  });

  // --- Restart ---

  it('resets to Email mode on restart', () => {
    window.history.pushState({}, '', '/?email=user%40test.com');
    const onRestart = jest.fn();
    render(<ForgotPasswordForm {...defaultProps} onRestart={onRestart} />);

    fireEvent.click(screen.getByRole('button', {name: 'Restart'}));

    expect(onRestart).toHaveBeenCalled();
    expect(screen.getByLabelText('Email')).toBeVisible();
    expect(screen.getByLabelText('Email')).toHaveValue('');
  });

  // --- Error ---

  it('displays error message', () => {
    render(<ForgotPasswordForm {...defaultProps} error={new Error('Something went wrong')} />);

    expect(screen.getByText('Something went wrong')).toBeVisible();
  });

  it('does not display error when undefined', () => {
    render(<ForgotPasswordForm {...defaultProps} />);

    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });

  // --- Login link ---

  it('renders back to login link', () => {
    render(<ForgotPasswordForm {...defaultProps} loginUrl="/login" />);

    const link = screen.getByText('Back to login');
    expect(link).toBeVisible();
    expect(link.closest('a')).toHaveAttribute('href', '/login');
  });

  it('does not render back to login link when url not provided', () => {
    render(<ForgotPasswordForm {...defaultProps} />);

    expect(screen.queryByText('Back to login')).not.toBeInTheDocument();
  });

  // --- Loading ---

  it('disables submit button when loading', () => {
    render(<ForgotPasswordForm {...defaultProps} loading />);

    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeDisabled();
  });

  // --- onSubmit rejection does not advance mode ---

  it('stays on current mode when onSubmit rejects', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const onSubmit = jest.fn<(data: ForgotPasswordFormData) => Promise<void>>().mockRejectedValue(new Error('fail'));
    render(<ForgotPasswordForm {...defaultProps} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Email'), {target: {value: 'user@test.com'}});
    fireEvent.submit(screen.getByRole('button', {name: 'Submit'}));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });

    // Should still be on Email mode
    expect(screen.getByLabelText('Email')).toBeVisible();
    consoleSpy.mockRestore();
  });
});
