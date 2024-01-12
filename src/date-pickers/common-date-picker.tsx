import React from 'react';
import {DatePicker, type DatePickerProps, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import useDayJsLocales from './dayjs-locales';

interface CommonDatePickerProperties extends DatePickerProps<any> {
    locale?: string
}

export function CommonDatePicker(properties: CommonDatePickerProperties) {
    const {
        locale: pLocale,
        ...rest
    } = properties;

    const locale = useDayJsLocales(pLocale);

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={locale}
        >
            <DatePicker {...rest} />
        </LocalizationProvider>
    );
}