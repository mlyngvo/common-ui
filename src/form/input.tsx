import {FormControl, FormControlProps, FormLabel, TextField, TextFieldProps} from "@mui/material";
import React from 'react';

import {randomInputId} from "./form-utils";

export interface InputProperties {
    label: string;
    id?: string;
    InputProps?: TextFieldProps;
    FormControlProps?: FormControlProps;
}
export function Input({id, label, InputProps: {sx, size, ...inputProperties} = {}, FormControlProps}: InputProperties) {
    const inputId = id ?? randomInputId();
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