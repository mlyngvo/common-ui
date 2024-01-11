import React, {useState} from 'react';
import dayjs from 'dayjs';
import {CommonDatePicker, CommonDateTimePicker, CommonTimePicker, render} from '../src';

function Demo() {

    const [locale, setLocale] = useState('en');

    return (
        <div>
            <CommonDatePicker locale={locale} value={dayjs()} />
            <CommonTimePicker locale={locale} value={dayjs()} />
            <CommonDateTimePicker  locale={locale} value={dayjs()} />

            <button onClick={() => { setLocale('en'); }}>EN</button>
            <button onClick={() => { setLocale('de'); }}>DE</button>
            <button onClick={() => { setLocale('vi'); }}>VI</button>
            <button onClick={() => { setLocale('ja'); }}>JA</button>
        </div>
    );
}

render(<Demo />);

