import React from 'react';
import {
    Autocomplete as MuiAutocomplete,
    FormControl,
    FormLabel,
    type AutocompleteProps as MuiAutocompleteProperties,
    type FormControlProps,
    TextField,
    CircularProgress
} from '@mui/material';

type AutocompleteInputProps<T> = { onChange?: (value: T|null) => void };

export interface AutocompleteProperties<T> {
    label: string;
    options: T[];
    id?: string;
    loading?: boolean;
    AutocompleteProps?: Omit<MuiAutocompleteProperties<T, false, false, false>, 'options'|'renderInput'|'onChange'>
        & AutocompleteInputProps<T>;
    FormControlProps?: FormControlProps;
    i18n?: {
        selectHint?: string;
        noOptions?: string;
    }
}

export function Autocomplete<T>(properties: AutocompleteProperties<T>) {
    const {
        id,
        label,
        options,
        loading = false,
        AutocompleteProps: {
            value,
            size = 'small',
            onChange,
            ...autocompleteProperties
        } = {},
        FormControlProps: {
            fullWidth = true,
            ...fromControlProperties
        } = {},
        i18n: {
            selectHint,
            noOptions,
        } = {}
    } = properties;

    const inputId = id ?? new Date().getTime().toString() + Math.random().toString(36).substring(3)
    return (
        <FormControl fullWidth={fullWidth} {...fromControlProperties}>
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
            <MuiAutocomplete
                id={inputId}
                size={size}
                loading={loading}
                options={options}
                noOptionsText={noOptions}
                renderInput={props =>
                    <TextField
                        {...props}
                        slotProps={{
                            input: {
                                ...props.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                        {props.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }
                        }}
                    />
                }
                value={value}
                onChange={(_, v) => onChange?.(v)}
                {...autocompleteProperties}
            />
        </FormControl
            >
    );
}