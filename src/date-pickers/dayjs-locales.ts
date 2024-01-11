import {useAsync} from 'react-async-hook';

const locales = {
    en: import('dayjs/locale/en'),
    de: import('dayjs/locale/de'),
    vi: import('dayjs/locale/vi'),
    ja: import('dayjs/locale/ja'),
};

export default function useDayJsLocales(locale?: string) {
    const {result} = useAsync(async () => {
        if (locale !== undefined && locales.hasOwnProperty(locale)) {
            try {
                await locales[locale as keyof typeof locales];
                return locale;
            } catch (error) {
                console.error(`Failed to load locale (${locale})`, error);
            }
        }
        // TODO: Fallback to language context
        return 'en';
    }, [locale]);

    return result;
}