import React from 'react';
import {Button, Container, Sheet, Typography} from '@mui/joy';
import {createLocalization} from '../../src';

type DefaultMessage = typeof import('../i18n/en.json')

const {useLocalization, LocalizationProvider} = createLocalization<DefaultMessage>({
    i18n: async (lang) => await import(`../i18n/${lang}.json`)
});

export function DemoLocalization() {

    return (
        <LocalizationProvider>
            <Translation />
        </LocalizationProvider>
    );
}

function Translation() {
    const {t, language, setLanguage} = useLocalization();

    return (
        <Container>
            <Sheet variant="outlined" sx={{ p: 3 }}>
                <Typography>Lang: {language}</Typography>

                <Button onClick={() => { setLanguage('en'); }}>Set EN</Button>
                <Button onClick={() => { setLanguage('de'); }}>Set DE</Button>

                <Typography>{t('depth.findMe.theValue')}</Typography>
            </Sheet>
        </Container>
    );

}