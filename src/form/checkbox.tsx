import React from "react";
import {
    Checkbox as MuiCheckbox,
    CheckboxProps as MuiCheckboxProps,
    FormControl,
    FormControlLabel,
    FormControlProps
} from "@mui/material";
import {randomInputId} from "./form-utils";

interface CheckboxProperties {
    label: string;
    id?: string;
    CheckboxProps?: Omit<MuiCheckboxProps, 'onChange'> & { onChange?: (checked: boolean) => void };
    FormControlProps?: FormControlProps;
}

export function Checkbox(props: CheckboxProperties) {
    const {
        id,
        label,
        CheckboxProps: {
            onChange,
            size = 'small',
            ...checkboxProps
        } = {},
        FormControlProps,
    } = props;
    const inputId = id ?? randomInputId();
    return (
        <FormControl {...FormControlProps}>
            <FormControlLabel id={inputId} control={<MuiCheckbox size={size} {...checkboxProps} />} label={label} />
        </FormControl>
    )
}
