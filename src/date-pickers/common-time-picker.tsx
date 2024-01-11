import React from 'react';
import {TimePicker, type TimePickerProps, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import useDayJsLocales from './dayjs-locales';


interface CommonTimePickerProperties extends TimePickerProps<any> {
    locale?: string
}

export function CommonTimePicker(properties: CommonTimePickerProperties) {
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
            <TimePicker {...rest} />
        </LocalizationProvider>
    );
}