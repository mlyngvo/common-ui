import React, {useMemo} from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export function DateDisplay({value, locale}: { value: string, locale?: string }) {
    const display = useMemo(() =>
            dayjs(value).locale(locale ?? window.navigator.language).format('ll')
        , [locale, value]);

    return (
        <span>
            {display}
        </span>
    );
}