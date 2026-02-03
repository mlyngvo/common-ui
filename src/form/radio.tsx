import {FormControl, FormControlLabel, FormControlProps, FormLabel, Radio as MuiRadio,RadioGroup, RadioGroupProps} from "@mui/material";
import React from "react";

import {randomInputId} from "./form-utils";

type RadioOption = { label: string, value: string };

interface RadioInputProps {
    value?: string;
    onChange?: (value: string) => void;
}

export interface RadioProperties {
    label: string;
    options: Array<RadioOption>;
    id?: string;
    FormControlProps?: FormControlProps;
    RadioProps?: Omit<RadioGroupProps, 'value'|'onChange'> & RadioInputProps;
}

export function Radio(props: RadioProperties) {
    const {
        id,
        label,
        options,
        FormControlProps: {fullWidth = true, ...FormControlProps} = {},
        RadioProps: {onChange, ...radioProps} = {},
    } = props;

    function handleChange(value: string) {
        onChange?.(value);
    }

    const inputId = id ?? randomInputId();
    return (
        <FormControl
            fullWidth={fullWidth}
            {...FormControlProps}
        >
            {label !== undefined && (
                <FormLabel
                    htmlFor={id}
                    sx={{
                        fontSize: 'small',
                        fontWeight: 600,
                        mb: 0.5
                    }}
                >
                    {label}
                </FormLabel>
            )}
            <RadioGroup
                id={inputId}
                onChange={(_, v) => handleChange(v)}
                {...radioProps}
            >
                {options.map(o => (
                    <FormControlLabel
                        key={o.value}
                        label={o.label}
                        value={o.value}
                        control={<MuiRadio size="small" sx={{ py: 0.3 }} />}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}