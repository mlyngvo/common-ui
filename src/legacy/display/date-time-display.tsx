import React, {useMemo} from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export function DateTimeDisplay({value, locale}: { value: string, locale?: string }) {
    const display = useMemo(() => {
        const date = dayjs(value).locale(locale ?? window.navigator.language);
        return `${date.format('ll')}, ${date.format('LT')}`;
    }, [locale, value]);

    return (
        <span>
            {display}
        </span>
    );
}