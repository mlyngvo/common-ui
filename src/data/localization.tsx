import React, {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import {storage} from "./local-storage";

const StorageKey = 'lang';

type MessageObject = {
    [key: string]: string | MessageObject;
}

interface ILocalizationContext<T> {
    language: string;
    setLanguage: (lang: string) => void;
    message?: T;
}

type Join<K, P> = K extends string | number ?
    P extends string | number ?
        `${K}${"" extends P ? "" : "."}${P}`
        : never : never;

type Paths<T> = T extends object ?
    { [K in keyof T]-?: K extends string | number ?
        `${K}` | Join<K, Paths<T[K]>>
        : never
    }[keyof T] : ""

interface LocalizationLoader<T extends MessageObject> {
    i18n: (lang: string) => Promise<T>,
}

export function createLocalization<T extends MessageObject>({i18n}: LocalizationLoader<T>) {
    const LocalizationContext = createContext<ILocalizationContext<T>>({
        language: 'en',
        setLanguage: () => void 0,
        message: undefined
    });

    function LocalizationProvider({children}: PropsWithChildren) {
        const [language, setLanguage] = useState('en');
        const [message, setMessage] = useState<T>();

        useEffect(() => {
            const lang = storage.get<string>(StorageKey) ?? navigator.language.substring(0, 2) as any;
            handleChangeLanguage(lang);
        }, []);

        useEffect(() => {
            i18n(language)
                .then(setMessage)
        }, [language]);

        function handleChangeLanguage(lang: string) {
            setLanguage(lang);
            storage.save(StorageKey, lang);
        }

        return (
            <LocalizationContext.Provider
                value={{
                    language,
                    setLanguage: handleChangeLanguage,
                    message
                }}
            >
                {children}
            </LocalizationContext.Provider>
        )
    }

    const useLocalization = () => {
        const {message, language, setLanguage} = useContext(LocalizationContext);

        const t = useCallback((key: Paths<T>) => {
            if (!message) return key as string;

            let count = 0;
            const keys = key.split('.');
            let text: any = message;
            for (let k of keys) {
                if (text[k]) {
                    text = text[k];
                }
                if (count === keys.length - 1) {
                    if (typeof text === 'string') {
                        return text;
                    }
                }
                count++;
            }

            throw new Error(`Invalid key (${key}) .`);
        }, [message])

        return {
            t,
            language,
            setLanguage
        }
    }

    return {
        LocalizationProvider,
        useLocalization
    }
}