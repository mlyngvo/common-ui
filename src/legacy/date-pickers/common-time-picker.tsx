import React from 'react';
import {
    TimePicker,
    type TimePickerProps,
    LocalizationProvider,
    type TimePickerSlotProps
} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {type Dayjs} from 'dayjs';
import useDayJsLocales from './dayjs-locales';
import {useStyleOverride} from './style-override';

export interface CommonTimePickerProperties extends Omit<TimePickerProps<Dayjs>, 'label'> {
    locale?: string
}

export function CommonTimePicker(properties: CommonTimePickerProperties) {
    const {
        locale: pLocale,
        ...rest
    } = properties;

    const locale = useDayJsLocales(pLocale);

    const slotProperties = useStyleOverride(false, true) as TimePickerSlotProps<Dayjs, false>;
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