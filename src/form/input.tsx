import React from 'react';
import {FormControl, FormLabel, Input as MuiInput, type InputProps as MuiInputProperties, type FormControlProps} from '@mui/joy';

export interface InputProperties {
    label?: string;
    InputProps?: MuiInputProperties;
    FormControlProps?: FormControlProps;
}
export function Input({label, InputProps: {sx, ...inputProperties} = {}, FormControlProps}: InputProperties) {
    return (
        <FormControl {...FormControlProps}>
            {label !== undefined && (
                <FormLabel
                    sx={{
                        typography: 'body-sm',
                        fontWeight: 600
                    }}
                >
                    {label}
                </FormLabel>
            )}
            <MuiInput
                sx={{
                    bgcolor: 'background.body',
                    ...sx
                }}
                {...inputProperties}
            />
        </FormControl>
    );
}