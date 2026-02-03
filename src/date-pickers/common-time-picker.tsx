import {FormControl, FormControlProps, FormLabel} from "@mui/material";
import {
    LocalizationProvider,
    MobileTimePicker, MobileTimePickerProps
} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import React from "react";

import {randomInputId} from "../form/form-utils";
import useDayJsLocales from "./dayjs-locales";
import {useStyleOverride} from "./style-override";

export interface CommonTimePickerProps {
    label: string;
    id?: string;
    locale?: string;
    FormControlProps?: FormControlProps;
    TimePickerProps?: MobileTimePickerProps<Dayjs>;
}

export function CommonTimePicker(props: CommonTimePickerProps) {
    const {
        locale: pLocale,
        id,
        label,
        FormControlProps: {fullWidth = true, ...restFormControlProps} = {},
        TimePickerProps: {sx, ...restProps} = {}
    } = props;
    const inputId = id ?? randomInputId();
    const locale = useDayJsLocales(pLocale);
    const slotProps = useStyleOverride(inputId, false, true) as MobileTimePickerProps<Dayjs>['slotProps'];
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={locale}
        >
            <FormControl
                fullWidth={fullWidth}
                {...restFormControlProps}
            >
                <FormLabel
                    htmlFor={inputId}
                    sx={{
                        fontSize: 'small',
                        fontWeight: 600,
                        pl: 1,
                        mb: 0.5
                    }}
                >
                    {label}
                </FormLabel>
                <MobileTimePicker
                    sx={{
                        ...sx,
                        mt: '0.3rem !important',
                    }}
                    {...restProps}
                    slotProps={slotProps}
                />
            </FormControl>
        </LocalizationProvider>
    )
}