import {useEffect, useState} from 'react';

import {storage} from '../utils/local-storage';
import {isNonBlank} from "../utils/strings";

const locales = {
    en: () => import('dayjs/locale/en'),
    de: () => import('dayjs/locale/de'),
    vi: () => import('dayjs/locale/vi'),
    ja: () => import('dayjs/locale/ja'),
};

/**
 * Resolves the locale to use for dayjs.
 * Priority: explicit param > storage > navigator > 'en'
 */
function resolveLocale(locale?: string): string {
    if (isNonBlank(locale)) return locale;

    const stored = storage.get<string>('lang');
    if (stored !== undefined) return stored;

    const browserLang = navigator.language.slice(0, 2);
    if (browserLang in locales) return browserLang;

    return 'en';
}

export default function useDayJsLocales(locale?: string) {
    const [result, setResult] = useState<string>();

    useEffect(() => {
        async function loadLocale() {
            const resolved = resolveLocale(locale);

            if (resolved in locales) {
                try {
                    await locales[resolved as keyof typeof locales]();
                    setResult(resolved);
                    return;
                } catch (error) {
                    console.error(`Failed to load locale (${resolved})`, error);
                }
            }

            setResult('en');
        }
        void loadLocale();
    }, [locale]);

    return result;
}