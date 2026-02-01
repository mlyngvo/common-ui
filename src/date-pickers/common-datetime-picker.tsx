import {FormLabel} from "@mui/material";
import {
    LocalizationProvider,
    MobileDateTimePicker,
    MobileDateTimePickerProps} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import React from "react";

import {randomInputId} from "../form/form-utils";
import useDayJsLocales from "./dayjs-locales";
import {useStyleOverride} from "./style-override";

export interface CommonDateTimePickerProps {
    label: string;
    id?: string;
    locale?: string;
    DateTimePickerProps?: MobileDateTimePickerProps<Dayjs>;
}

export function CommonDateTimePicker({locale: pLocale, id, label, DateTimePickerProps: {sx, ...restProps} = {}}: CommonDateTimePickerProps) {
    const inputId = id ?? randomInputId();
    const locale = useDayJsLocales(pLocale);
    const slotProps = useStyleOverride(inputId, true, true) as MobileDateTimePickerProps<Dayjs>['slotProps'];
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={locale}
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
            <MobileDateTimePicker
                sx={{
                    ...sx,
                    mt: '0.3rem !important'
                }}
                {...restProps}
                slotProps={slotProps}
            />
        </LocalizationProvider>
    )
}