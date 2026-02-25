import {
    Checkbox as MuiCheckbox,
    type CheckboxProps as MuiCheckboxProps,
    FormControl,
    FormControlLabel,
    type FormControlProps
} from "@mui/material";
import React from "react";

import {randomInputId} from "./form-utils";

export interface CheckboxProperties {
    label: string;
    id?: string;
    FormControlProps?: FormControlProps;
    CheckboxProps?: Omit<MuiCheckboxProps, 'onChange'> & { onChange?: (checked: boolean) => void };
}

export function Checkbox(props: CheckboxProperties) {
    const {
        id,
        label,
        FormControlProps: {
            fullWidth = true,
            ...restFormControlProps
        } = {},
        CheckboxProps: {
            size = 'small',
            onChange,
            ...checkboxProps
        } = {},
    } = props;

    function handleChange(checked: boolean) {
        onChange?.(checked);
    }

    const inputId = id ?? randomInputId();
    return (
        <FormControl fullWidth={fullWidth} {...restFormControlProps}>
            <FormControlLabel control={<MuiCheckbox id={inputId} size={size} onChange={(ev, checked) => handleChange(checked)} {...checkboxProps} />} label={label} />
        </FormControl>
    )
}
