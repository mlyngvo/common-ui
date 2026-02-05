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

type Primitive = string | number;

/**
 * Generates only paths that resolve to leaf values (string | number).
 * Excludes paths that resolve to nested objects.
 * Depth is limited to 5 levels to avoid TypeScript recursion limits.
 */
type LeafPaths<T, D extends number[] = []> =
    D['length'] extends 5 ? never :
    T extends Primitive ? never :
    T extends object ? {
        [K in keyof T & (string | number)]:
            T[K] extends Primitive
                ? `${K}`
                : `${K}.${LeafPaths<T[K], [...D, 0]>}`
    }[keyof T & (string | number)]
    : never;

/**
 * Generates only paths that resolve to object values (not primitives).
 * Used for enum-style lookups where the value is a key of the nested object.
 */
type ObjectPaths<T, D extends number[] = []> =
    D['length'] extends 5 ? never :
    T extends Primitive ? never :
    T extends object ? {
        [K in keyof T & (string | number)]:
            T[K] extends Primitive
                ? never
                : T[K] extends object
                    ? `${K}` | `${K}.${ObjectPaths<T[K], [...D, 0]>}`
                    : never
    }[keyof T & (string | number)]
    : never;

/**
 * Extracts the type at a given dot-separated path.
 */
type ValueAt<T, P extends string> =
    P extends `${infer K}.${infer Rest}`
        ? K extends keyof T ? ValueAt<T[K], Rest> : never
        : P extends keyof T ? T[P] : never;

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

        const t = useCallback((key: LeafPaths<T>) => {
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

            console.error(`Invalid key (${key as string}) in language ${language}.`);
            return key as string;
        }, [message]);

        const e = useCallback(<K extends ObjectPaths<T>>(
            key: K,
            enumValue: keyof ValueAt<T, K> & string
        ): string => {
            if (message === undefined) return `${key}.${enumValue}`;

            let result: unknown = message;
            for (const k of key.split('.')) {
                if (result === null || typeof result !== 'object') {
                    console.error(`Invalid key (${key}) in language ${language}.`);
                    return `${key}.${enumValue}`;
                }
                result = (result as Record<string, unknown>)[k];
            }

            if (result === null || typeof result !== 'object') {
                console.error(`Invalid key (${key}) in language ${language}.`);
                return `${key}.${enumValue}`;
            }

            const value = (result as Record<string, unknown>)[enumValue];
            if (typeof value !== 'string') {
                console.error(`Invalid enum value (${enumValue}) for key (${key}) in language ${language}.`);
                return `${key}.${enumValue}`;
            }

            return value;
        }, [message, language]);

        return {
            t,
            e,
            language,
            setLanguage
        };
    };

    return {
        LocalizationProvider,
        useLocalization
    };
}