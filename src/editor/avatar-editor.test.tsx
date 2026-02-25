import {afterEach, describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import {AvatarEditor} from './avatar-editor';

jest.mock('react-avatar-editor', () => {
    const MockEditor = React.forwardRef((_props: Record<string, unknown>, ref: React.Ref<unknown>) => {
        React.useImperativeHandle(ref, () => ({
            getImageScaledToCanvas: () => ({
                toDataURL: () => 'data:image/png;base64,mock',
            }),
        }));
        return <canvas data-testid="avatar-canvas" />;
    });
    MockEditor.displayName = 'MockReactAvatarEditor';
    return { __esModule: true, default: MockEditor };
});

const defaultProps = {
    onSave: jest.fn(),
    onCancel: jest.fn(),
};

afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
});

describe('AvatarEditor', () => {
    it('renders upload button and cancel button', () => {
        render(<AvatarEditor {...defaultProps} />);

        expect(screen.getByText('Upload a file')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('does not render editor or save button without a file', () => {
        render(<AvatarEditor {...defaultProps} />);

        expect(screen.queryByTestId('avatar-canvas')).not.toBeInTheDocument();
        expect(screen.queryByText('Save')).not.toBeInTheDocument();
    });

    it('shows editor and save button after file upload', () => {
        render(<AvatarEditor {...defaultProps} />);

        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        const file = new File(['pixels'], 'avatar.png', {type: 'image/png'});
        fireEvent.change(input, {target: {files: [file]}});

        expect(screen.getByTestId('avatar-canvas')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('calls onSave with image data when save is clicked', () => {
        const onSave = jest.fn();
        render(<AvatarEditor {...defaultProps} onSave={onSave} />);

        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        const file = new File(['pixels'], 'avatar.png', {type: 'image/png'});
        fireEvent.change(input, {target: {files: [file]}});

        fireEvent.click(screen.getByText('Save'));

        expect(onSave).toHaveBeenCalledWith('data:image/png;base64,mock');
    });

    it('calls onCancel when cancel is clicked', () => {
        const onCancel = jest.fn();
        render(<AvatarEditor {...defaultProps} onCancel={onCancel} />);

        fireEvent.click(screen.getByText('Cancel'));

        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('renders custom i18n labels', () => {
        render(
            <AvatarEditor
                {...defaultProps}
                i18n={{
                    uploadFile: 'Datei hochladen',
                    save: 'Speichern',
                    cancel: 'Abbrechen',
                }}
            />
        );

        expect(screen.getByText('Datei hochladen')).toBeInTheDocument();
        expect(screen.getByText('Abbrechen')).toBeInTheDocument();
    });

    it('shows save button with custom i18n after file upload', () => {
        render(
            <AvatarEditor
                {...defaultProps}
                i18n={{save: 'Speichern'}}
            />
        );

        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        const file = new File(['pixels'], 'avatar.png', {type: 'image/png'});
        fireEvent.change(input, {target: {files: [file]}});

        expect(screen.getByText('Speichern')).toBeInTheDocument();
    });

    it('accepts only image files', () => {
        render(<AvatarEditor {...defaultProps} />);

        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        expect(input.accept).toBe('image/*');
    });

    it('ignores empty file list', () => {
        render(<AvatarEditor {...defaultProps} />);

        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        fireEvent.change(input, {target: {files: []}});

        expect(screen.queryByTestId('avatar-canvas')).not.toBeInTheDocument();
    });
});
