import {createLocalization} from '../../src';

type Messages = typeof import('./en.json');

const modules = import.meta.glob<{ default: Messages }>('./*.json');

export const supportedLanguages = Object.keys(modules)
    .map(path => path.match(/\.\/(.+)\.json/)?.[1])
    .filter((lang): lang is string => lang !== undefined)
    .sort();

const {LocalizationProvider, useLocalization} = createLocalization<Messages>({
    i18n: async (lang): Promise<Messages> => {
        const key = `./${lang}.json`;
        const loader = modules[key] ?? modules['./en.json'];
        const mod = await loader();
        return mod.default;
    },
});

export {LocalizationProvider, useLocalization};
