import {FormControl, FormControlLabel,FormControlProps, Switch as MuiSwitch, SwitchProps} from "@mui/material";
import {styled} from "@mui/material/styles";
import React from "react";

import {randomInputId} from "./form-utils";

interface SwitchInputProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

export interface SwitchProperties {
    label: string;
    id?: string;
    FormControlProps?: FormControlProps;
    SwitchProps?: Omit<SwitchProps, 'checked'|'onChange'> & SwitchInputProps;
}

const AntSwitch = styled(MuiSwitch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    margin: `0 ${theme.spacing(1)}`,
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgba(255,255,255,.35)',
        }),
    },
}));

export function Switch(props: SwitchProperties) {
    const {
        id,
        label,
        FormControlProps: {
            fullWidth = true,
            ...restFormControlProps
        } = {},
        SwitchProps: {
            onChange,
            ...restSwitchProps
        } = {},
    } = props;

    function handleChange(checked: boolean) {
        onChange?.(checked);
    }

    const inputId = id ?? randomInputId();
    return (
        <FormControl
            fullWidth={fullWidth}
            {...restFormControlProps}
        >
            <FormControlLabel
                control={(
                    <AntSwitch
                        id={inputId}
                        onChange={(_, checked) => handleChange(checked)}
                        {...restSwitchProps}
                    />
                )}
                label={label}
            />
        </FormControl>
    )
}