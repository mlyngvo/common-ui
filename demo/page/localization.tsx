import React from "react";
import {Button, Sheet, Typography} from "@mui/joy";
import {createLocalization} from "../../src";

const {useLocalization, LocalizationProvider} = createLocalization<typeof import('../i18n/en.json')>({
    i18n: (lang) => import(`../i18n/${lang}.json`)
});

export function DemoLocalization() {

    return (
        <LocalizationProvider>
            <Translation />
        </LocalizationProvider>
    )
}

function Translation() {
    const {t, language, setLanguage} = useLocalization();

    return (
        <Sheet variant="outlined" sx={{ p: 3 }}>
            <Typography>Lang: {language}</Typography>

            <Button onClick={() => setLanguage('en')}>Set EN</Button>
            <Button onClick={() => setLanguage('de')}>Set DE</Button>

            <Typography>{t('depth.findMe.theValue')}</Typography>
        </Sheet>
    )

}