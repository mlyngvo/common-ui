import React from "react";
import {FormControl, FormControlProps, FormLabel, RadioGroupProps, RadioGroup, FormControlLabel, Radio as MuiRadio} from "@mui/material";
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
    RadioProps?: Omit<RadioGroupProps, 'value'|'onChange'> & RadioInputProps;
    FormControlProps?: FormControlProps;
}

export function Radio(props: RadioProperties) {
    const {
        id,
        label,
        options,
        RadioProps: {
            onChange,
            ...radioProps
        } = {},
        FormControlProps
    } = props;

    function handleChange(value: string) {
        onChange?.(value);
    }

    const inputId = id ?? randomInputId();
    return (
        <FormControl {...FormControlProps}>
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
                        label={o.label}
                        value={o.value}
                        control={<MuiRadio size="small" sx={{ py: 0.3 }} />}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}