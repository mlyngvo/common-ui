import React from 'react';
import {
    Autocomplete as MuiAutocomplete,
    FormControl,
    FormLabel,
    type AutocompleteProps as MuiAutocompleteProperties,
    type FormControlProps, CircularProgress, IconButton,
} from '@mui/joy';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export interface AutocompleteProperties<T> {
    label: string;
    options: T[];
    loading?: boolean;
    AutocompleteProps?: Omit<MuiAutocompleteProperties<T, false, false, false>, 'options'> & { onClear?: () => void };
    FormControlProps?: FormControlProps;
    i18n?: {
        selectHint?: string;
    }
}

export function Autocomplete<T>(properties: AutocompleteProperties<T>) {
    const {
        label,
        options,
        loading = false,
        AutocompleteProps: {
            sx,
            value,
            onClear,
            ...autocompleteProperties
        } = {},
        FormControlProps,
        i18n: {
            selectHint
        } = {}
    } = properties;
    return (
        <FormControl {...FormControlProps}>
            <FormLabel
                sx={{
                    typography: 'body-sm',
                    fontWeight: 600
                }}
            >
                {label}
            </FormLabel>
            <MuiAutocomplete
                placeholder={selectHint ?? 'Please select'}
                // eslint-disable-next-line unicorn/no-null
                value={value ?? null}
                options={options ?? []}
                loading={loading}
                {...autocompleteProperties}
                endDecorator={(
                    <>
                        {loading && <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />}
                        {!loading && value !== undefined && value !== null && (
                            <IconButton
                                size="sm"
                                variant="plain"
                                color="neutral"
                                onMouseDown={(event) => {
                                    event.stopPropagation();
                                }}
                                onClick={onClear}
                            >
                                <CloseRoundedIcon />
                            </IconButton>
                        )}
                    </>
                )}
                sx={{
                    bgcolor: 'background.body',
                    ...sx
                }}
            />
        </FormControl
            >
    );
}