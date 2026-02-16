import {FormControl, FormControlProps, FormLabel, TextField, TextFieldProps} from "@mui/material";
import React from 'react';

import {randomInputId} from "./form-utils";

interface InputProps {
    value?: string;
    onChange?: (value: string) => void;
}

export interface InputProperties {
    label: string;
    id?: string;
    InputProps?: Omit<TextFieldProps, 'value'|'onChange'> & InputProps;
    FormControlProps?: FormControlProps;
}
export function Input(props: InputProperties) {
    const {
        id,
        label,
        FormControlProps: {fullWidth = true, ...FormControlProps} = {},
        InputProps: {sx, size, onChange, ...inputProperties} = {},
    } = props;

    function handleChange(value: string) {
        onChange?.(value);
    }

    const inputId = id ?? randomInputId();
    return (
        <FormControl
            fullWidth={fullWidth}
            {...FormControlProps}
        >
            {label !== undefined && (
                <FormLabel
                    htmlFor={inputId}
                    sx={{
                        fontSize: 'small',
                        fontWeight: 600,
                        pl: 1,
                        mb: 0.5
                    }}
                >
                    {label}
                </FormLabel>
            )}
            <TextField
                id={inputId}
                sx={{
                    bgcolor: 'background.body',
                    ...sx
                }}
                size={size ?? 'small'}
                onChange={ev => handleChange(ev.target.value)}
                {...inputProperties}
            />
        </FormControl>
    );
}