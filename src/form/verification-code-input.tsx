import {Box, BoxProps, FormLabel, OutlinedInput, Stack} from "@mui/material";
import React, {useRef} from 'react';

import {randomInputId} from "./form-utils";

export interface VerificationCodeInputProperties {
    label: string;
    id?: string;
    length?: number;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    BoxProps?: BoxProps;
}

export function VerificationCodeInput(props: VerificationCodeInputProperties) {
    const {
        label,
        id,
        length = 6,
        value = '',
        onChange,
        disabled = false,
        required = false,
        error = false,
        BoxProps: boxProps = {},
    } = props;

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const inputId = id ?? randomInputId();

    function updateValue(chars: string[]) {
        onChange?.(chars.join(''));
    }

    function handleChange(index: number, inputValue: string) {
        if (inputValue.length === 0) return;

        const chars = value.padEnd(length, ' ').split('');
        chars[index] = inputValue[inputValue.length - 1];
        updateValue(chars.map(c => c.trim()));

        if (index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index: number, ev: React.KeyboardEvent<HTMLInputElement>) {
        if (ev.key === 'Backspace') {
            const chars = value.padEnd(length, ' ').split('');
            if (chars[index].trim() === '' && index > 0) {
                chars[index - 1] = ' ';
                updateValue(chars.map(c => c.trim()));
                inputRefs.current[index - 1]?.focus();
            } else {
                chars[index] = ' ';
                updateValue(chars.map(c => c.trim()));
            }
            ev.preventDefault();
        }
    }

    function handlePaste(ev: React.ClipboardEvent<HTMLInputElement>) {
        ev.preventDefault();
        const pasted = ev.clipboardData.getData('text').slice(0, length);
        const chars = pasted.split('');
        while (chars.length < length) chars.push('');
        updateValue(chars);

        const focusIndex = Math.min(pasted.length, length - 1);
        inputRefs.current[focusIndex]?.focus();
    }

    return (
        <Box
            {...boxProps}
        >
            {label !== undefined && (
                <FormLabel
                    htmlFor={`${inputId}-0`}
                    sx={{
                        fontSize: 'small',
                        fontWeight: 600,
                        pl: 1,
                        mb: 1,
                        display: 'block',
                    }}
                >
                    {label}
                </FormLabel>
            )}
            <Stack direction="row" gap={1} justifyContent="stretch">
                {Array.from({length}, (_, i) => (
                    <OutlinedInput
                        key={i}
                        id={`${inputId}-${i}`}
                        inputRef={(el: HTMLInputElement | null) => { inputRefs.current[i] = el; }}
                        value={value[i] ?? ''}
                        onChange={ev => handleChange(i, ev.target.value)}
                        onKeyDown={ev => handleKeyDown(i, ev as React.KeyboardEvent<HTMLInputElement>)}
                        onPaste={handlePaste}
                        disabled={disabled}
                        required={required && i === 0}
                        error={error}
                        inputProps={{
                            maxLength: 2,
                            style: {
                                textAlign: 'center',
                                fontFamily: 'monospace',
                            },
                        }}
                        sx={{
                            minWidth: 40,
                            bgcolor: 'background.body',
                        }}
                        size="small"
                    />
                ))}
            </Stack>
        </Box>
    );
}
