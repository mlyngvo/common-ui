import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
Box, CircularProgress,
    FormControl, FormControlProps, FormHelperText,     FormLabel, IconButton, MenuItem, Select as MuiSelect, SelectProps as MuiSelectProps} from "@mui/material";
import React, {type ReactElement, useState} from 'react';

import {useFlag} from "../utils";
import {randomInputId} from "./form-utils";

type SelectOption = { label: string, value: string|number };

interface SelectInputProps {
    value?: string|number|undefined;
    onChange?: (value: string|number|undefined) => void;
}

export interface SelectProperties {
    label: string;
    options: Array<SelectOption>;
    id?: string;
    loading?: boolean;
    renderOption?: (option: SelectOption) => ReactElement;
    helperText?: ReactElement|string|number|undefined;
    SelectProps?: Omit<MuiSelectProps, 'value'|'onChange'> & SelectInputProps;
    FormControlProps?: FormControlProps;
    i18n?: {
        emptyLabel?: string;
    };
}

export function Select(properties: SelectProperties) {
    const {
        id,
        label,
        options,
        renderOption,
        loading = false,
        helperText,
        SelectProps: {
            size = 'small',
            displayEmpty = true,
            value,
            onChange,
            ...selectProperties
        } = {},
        FormControlProps: {
            fullWidth = true,
            ...formControlProperties
        } = {},
        i18n: {
            emptyLabel
        } = {}
    } = properties;

    const [open, setOpen, clearOpen, toggleOpen] = useFlag(false);

    const [stateVal, setStateVal] = useState(value ?? "");

    function handleChange(value: string|number) {
        setStateVal(value);
        onChange?.(value);
    }

    function handleClear() {
        setStateVal("");
        onChange?.(undefined);
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