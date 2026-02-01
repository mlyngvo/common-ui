import {FormLabel, useMediaQuery} from "@mui/material";
import {
    DatePicker,
    DatePickerProps,
    DatePickerSlotProps,
    LocalizationProvider,
    MobileDatePicker
} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import React from "react";

import {randomInputId} from "../form/form-utils";
import useDayJsLocales from "./dayjs-locales";
import {useStyleOverride} from "./style-override";

export interface CommonDatePickerProps {
    label: string;
    id?: string;
    locale?: string;
    DatePickerProps?: DatePickerProps<Dayjs>;
}

export function CommonDatePicker({locale: pLocale, id, label, DatePickerProps: {sx, ...restProps} = {}}: CommonDatePickerProps) {
    const inputId = id ?? randomInputId();
    const mobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const locale = useDayJsLocales(pLocale);
    const slotProps = useStyleOverride(inputId, true, false) as DatePickerSlotProps<Dayjs, false>;
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
            {mobile
                ? (
                    <MobileDatePicker
                        sx={{
                            ...sx,
                            mt: '0.3rem !important',
                            display: { xs: 'block', sm: 'none' },
                        }}
                        {...restProps}
                        slotProps={slotProps}
                    />
                )
                : (
                    <DatePicker
                        sx={{
                            ...sx,
                            mt: '0.3rem !important',
                            display: { xs: 'none', sm: 'block' },
                        }}
                        {...restProps}
                        slotProps={slotProps}
                    />
                )
            }
        </LocalizationProvider>
    )
}