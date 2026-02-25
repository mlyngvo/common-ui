import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {type FormControlProps, IconButton, InputAdornment} from "@mui/material";
import React from "react";

import {useFlag} from "../utils/use-flag";
import {Input} from "./input";

export interface PasswordInputProperties {
    label: string;
    id?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
    FormControlProps?: FormControlProps;
}

export function PasswordInput(props: PasswordInputProperties) {
    const {label, id, value, onChange, disabled, required, FormControlProps} = props;
    const [showPassword, , , toggleShowPassword] = useFlag(false);

    return (
        <Input
            label={label}
            id={id}
            FormControlProps={FormControlProps}
            InputProps={{
                required,
                type: showPassword ? 'text' : 'password',
                value,
                onChange,
                disabled,
                slotProps: {
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword
                                        ? <VisibilityRoundedIcon fontSize="inherit" />
                                        : <VisibilityOffRoundedIcon fontSize="inherit" />
                                    }
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }
            }}
        />
    );
}
