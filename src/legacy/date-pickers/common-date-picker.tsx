import React from 'react';
import {
    DatePicker,
    type DatePickerProps,
    type DatePickerSlotProps,
    LocalizationProvider
} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {type Dayjs} from 'dayjs';
import useDayJsLocales from './dayjs-locales';
import {useStyleOverride} from './style-override';

export interface CommonDatePickerProperties extends Omit<DatePickerProps<Dayjs>, 'label'> {
    locale?: string
}

export function CommonDatePicker(properties: CommonDatePickerProperties) {
    const {
        locale: pLocale,
        ...rest
    } = properties;

    const locale = useDayJsLocales(pLocale);

    const slotProperties = useStyleOverride(true, false) as DatePickerSlotProps<Dayjs, false>;
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={locale}
        >
            <DatePicker
                {...rest}
                slotProps={slotProperties}
            />
        </LocalizationProvider>
    );
}