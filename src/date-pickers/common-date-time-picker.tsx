import React from 'react';
import {
    DateTimePicker,
    type DateTimePickerProps, type DateTimePickerSlotsComponentsProps,
    LocalizationProvider
} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import useDayJsLocales from './dayjs-locales';
import {useStyleOverride} from './style-override';

interface CommonDateTimePickerProperties extends DateTimePickerProps<any> {
    locale?: string
}

export function CommonDateTimePicker(properties: CommonDateTimePickerProperties) {
    const {
        locale: pLocale,
        ...rest
    } = properties;

    const locale = useDayJsLocales(pLocale);

    const slotProperties = useStyleOverride(true, true) as DateTimePickerSlotsComponentsProps<any>;
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={locale}
        >
            <DateTimePicker
                {...rest}
                slotProps={slotProperties}
            />
        </LocalizationProvider>
    );
}