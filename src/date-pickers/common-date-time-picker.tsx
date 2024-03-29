import React from 'react';
import {
    DateTimePicker,
    type DateTimePickerProps, type DateTimePickerSlotsComponentsProps,
    LocalizationProvider
} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {type Dayjs} from 'dayjs';
import useDayJsLocales from './dayjs-locales';
import {useStyleOverride} from './style-override';

export interface CommonDateTimePickerProperties extends Omit<DateTimePickerProps<Dayjs>, 'label'> {
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