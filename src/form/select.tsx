import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {Box, CircularProgress, FormControl, type FormControlProps, FormHelperText, FormLabel, IconButton, MenuItem, Select as MuiSelect, type SelectProps as MuiSelectProps} from "@mui/material";
import React, {type ReactElement, useState} from 'react';

import {useFlag} from "../utils/use-flag";
import {randomInputId} from "./form-utils";

type SelectValue = string|number;

type SelectOption = { label: string, value: SelectValue };

interface SelectInputProps<T extends SelectValue = SelectValue> {
    value?: T;
    onChange?: (value: T) => void;
}

export interface SelectProperties<T extends SelectValue = SelectValue> {
    label: string;
    options: Array<SelectOption>;
    id?: string;
    loading?: boolean;
    renderOption?: (option: SelectOption) => ReactElement;
    helperText?: ReactElement|string|number|undefined;
    FormControlProps?: FormControlProps;
    SelectProps?: Omit<MuiSelectProps, 'value'|'onChange'> & SelectInputProps<T>;
    i18n?: {
        emptyLabel?: string;
    };
}

export function Select<T extends SelectValue = SelectValue>(properties: SelectProperties<T>) {
    const {
        id,
        label,
        options,
        renderOption,
        loading = false,
        helperText,
        FormControlProps: {
            fullWidth = true,
            ...formControlProperties
        } = {},
        SelectProps: {
            size = 'small',
            displayEmpty = true,
            value,
            onChange,
            ...selectProperties
        } = {},
        i18n: {
            emptyLabel
        } = {}
    } = properties;

    const [open, setOpen, clearOpen, toggleOpen] = useFlag(false);

    const [stateVal, setStateVal] = useState<SelectValue>(value ?? "");

    function handleChange(value: SelectValue) {
        setStateVal(value);
        onChange?.(value as T);
    }

    function handleClear() {
        setStateVal("");
        onChange?.("" as T);
    }

    const inputId = id ?? randomInputId();
    return (
        <FormControl
            fullWidth={fullWidth}
            {...formControlProperties}
        >
            {label !== undefined && (
                <FormLabel
                    htmlFor={inputId}
                    onClick={toggleOpen}
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
            <MuiSelect
                inputProps={{
                    id: inputId,
                }}
                size={size}
                displayEmpty={displayEmpty}
                {...selectProperties}
                value={stateVal}
                onChange={ev => handleChange(ev.target.value as string | number)}
                open={open}
                onOpen={setOpen}
                onClose={clearOpen}
                disabled={loading}
                {...(loading
                        ? ({
                            endAdornment: (
                                <Box
                                    sx={{
                                        mt: 0.5,
                                        mr: 3
                                    }}
                                >
                                    <CircularProgress size={18} sx={{ color: 'text.secondary' }} />
                                </Box>
                            )
                        })
                        : (stateVal !== '' && {
                            endAdornment: (
                                <IconButton
                                    sx={{
                                        mr: 1.5
                                    }}
                                    size="small"
                                    color="default"
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onClick={handleClear}
                                >
                                    <CloseRoundedIcon />
                                </IconButton>
                            )
                        })
                )}
            >
                <MenuItem value="">{emptyLabel ?? 'None'}</MenuItem>
                {options.map(o =>
                    <MenuItem key={o.value} value={o.value}>
                        {renderOption === undefined
                            ? o.label
                            : renderOption(o)
                        }
                    </MenuItem>

                )}
            </MuiSelect>
            {helperText !== undefined && (
                <FormHelperText>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
}