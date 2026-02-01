import {
    Checkbox as MuiCheckbox,
    CheckboxProps as MuiCheckboxProps,
    FormControl,
    FormControlLabel,
    FormControlProps
} from "@mui/material";
import React from "react";

import {randomInputId} from "./form-utils";

export interface CheckboxProperties {
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
            size = 'small',
            onChange,
            ...checkboxProps
        } = {},
        FormControlProps,
    } = props;

    function handleChange(checked: boolean) {
        onChange?.(checked);
    }

    const inputId = id ?? randomInputId();
    return (
        <FormControl {...FormControlProps}>
            <FormControlLabel control={<MuiCheckbox id={inputId} size={size} onChange={(ev, checked) => handleChange(checked)} {...checkboxProps} />} label={label} />
        </FormControl>
    )
}
