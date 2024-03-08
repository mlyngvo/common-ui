import React, {
    createContext,
    type PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import {storage} from './local-storage';

const StorageKey = 'lang';

interface MessageObject {
    [key: string]: string | MessageObject;
}

interface ILocalizationContext<T> {
    language: string;
    setLanguage: (lang: string) => void;
    message?: T;
}

type Join<K, P> = K extends string | number ?
    P extends string | number ?
        `${K}${'' extends P ? '' : '.'}${P}`
        : never : never;

type Paths<T> = T extends object ?
    { [K in keyof T]-?: K extends string | number ?
        `${K}` | Join<K, Paths<T[K]>>
        : never
    }[keyof T] : ''

interface LocalizationLoader<T extends MessageObject> {
    i18n: (lang: string) => Promise<T>,
}

export function createLocalization<T extends MessageObject>({i18n}: LocalizationLoader<T>) {
    const LocalizationContext = createContext<ILocalizationContext<T>>({
        language: 'en',
        setLanguage: () => {},
        message: undefined
    });

    function LocalizationProvider({children}: PropsWithChildren) {
        const [language, setLanguage] = useState('en');
        const [message, setMessage] = useState<T>();

        useEffect(() => {
            const lang = storage.get<string>(StorageKey) ?? navigator.language.slice(0, 2);
            handleChangeLanguage(lang);
        }, []);

        useEffect(() => {
            i18n(language)
                .then(setMessage)
                .catch(console.error);
        }, [language]);

        function handleChangeLanguage(lang: string) {
            setLanguage(lang);
            storage.save(StorageKey, lang);
        }

        const value = useMemo(() => ({
            language,
            setLanguage: handleChangeLanguage,
            message
        }), [language, message]);

        return (
            <LocalizationContext.Provider
                value={value}
            >
                {children}
            </LocalizationContext.Provider>
        );
    }

    const useLocalization = () => {
        const {message, language, setLanguage} = useContext(LocalizationContext);

        const t = useCallback((key: Paths<T>) => {
            if (message === undefined) return key as string;

            let count = 0;
            const keys = key.split('.');
            let text: any = message;
            for (const k of keys) {
                if (text[k] !== undefined) {
                    text = text[k];
                }
                if (count === keys.length - 1 && typeof text === 'string') {
                        return text;
                    }
                count += 1;
            }

            throw new Error(`Invalid key (${key}) .`);
        }, [message]);

        return {
            t,
            language,
            setLanguage
        };
    };

    return {
        LocalizationProvider,
        useLocalization
    };
}