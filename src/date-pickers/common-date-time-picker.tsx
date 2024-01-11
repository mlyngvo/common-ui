import React from 'react';
import {DateTimePicker, type DateTimePickerProps, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import useDayJsLocales from './dayjs-locales';

interface CommonDateTimePickerProperties extends DateTimePickerProps<any> {
    locale?: string
}

export function CommonDateTimePicker(properties: CommonDateTimePickerProperties) {
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
            <DateTimePicker {...rest} />
        </LocalizationProvider>
    );
}