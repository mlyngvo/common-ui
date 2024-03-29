import React from 'react';
import {
    TimePicker,
    type TimePickerProps,
    LocalizationProvider,
    type TimePickerSlotsComponentsProps
} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import useDayJsLocales from './dayjs-locales';
import {useStyleOverride} from './style-override';

interface CommonTimePickerProperties extends TimePickerProps<any> {
    locale?: string
}

export function CommonTimePicker(properties: CommonTimePickerProperties) {
    const {
        locale: pLocale,
        ...rest
    } = properties;

    const locale = useDayJsLocales(pLocale);

    const slotProperties = useStyleOverride(false, true) as TimePickerSlotsComponentsProps<any>;
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={locale}
        >
            <TimePicker
                {...rest}
                slotProps={slotProperties}
            />
        </LocalizationProvider>
    );
}