import React from 'react';
import {FormControl, FormControlProps, FormLabel, TextField, TextFieldProps} from "@mui/material";

export interface InputProperties {
    id?: string;
    label?: string;
    InputProps?: TextFieldProps;
    FormControlProps?: FormControlProps;
}
export function Input({id, label, InputProps: {sx, size, ...inputProperties} = {}, FormControlProps}: InputProperties) {
    const inputId = id ?? new Date().getTime().toString() + Math.random().toString(36).substring(2);
    return (
        <FormControl {...FormControlProps}>
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
                {...inputProperties}
            />
        </FormControl>
    );
}