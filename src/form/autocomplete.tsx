import {
    Autocomplete as MuiAutocomplete,
    type AutocompleteProps as MuiAutocompleteProperties,
    CircularProgress,
    FormControl,
    type FormControlProps,
    FormLabel,
    TextField} from '@mui/material';
import React, {useId} from 'react';

type AutocompleteInputProps<T> = { onChange?: (value: T|null) => void };

export interface AutocompleteProperties<T> {
    label: string;
    options: T[];
    id?: string;
    loading?: boolean;
    /** Called only when user types in the input (not on option selection) */
    onSearch?: (value: string) => void;
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
        onSearch,
        AutocompleteProps: {
            value,
            size = 'small',
            onChange,
            onInputChange,
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

    const generatedId = useId();
    const inputId = id ?? generatedId;
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
                        placeholder={selectHint ?? "Please select"}
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
                onInputChange={(event, v, reason) => {
                    if (reason === 'input' && onSearch) {
                        onSearch(v);
                    }
                    onInputChange?.(event, v, reason);
                }}
                {...autocompleteProperties}
            />
        </FormControl
            >
    );
}