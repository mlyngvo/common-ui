import {Box, Card, CardContent, Chip, Grid, Stack, Typography} from '@mui/material';
import dayjs, {Dayjs} from 'dayjs';
import React, {useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Body, Breadcrumbs, CommonDatePicker, DateDisplay, DateTimeDisplay, PageTitle, Select, Switch} from '../../src';
import {LocalizationProvider, supportedLanguages, useLocalization} from '../i18n';
import {isNonBlank} from "../../src/utils/strings";

const STATUS_VALUES = ['active', 'inactive', 'pending'] as const;
const PRIORITY_VALUES = ['low', 'medium', 'high'] as const;

function LocalizationContent() {
    const navigate = useNavigate();
    const {t, e, language, setLanguage} = useLocalization();

    const [showTime, setShowTime] = useState(false);
    const [date, setDate] = useState<Dayjs | null>(null);

    const languageOptions = useMemo(
        () => supportedLanguages.map(lang => ({label: lang.toUpperCase(), value: lang})),
        [],
    );

    return (
        <Body
            title={
                <Stack
                    direction="row"
                    gap={1}
                    alignItems="flex-end"
                    width="100%"
                >
                    <Box flexGrow={1}>
                        <PageTitle title="Localization" />
                    </Box>
                    <Select
                        preventEmpty
                        label="Language"
                        options={languageOptions}
                        FormControlProps={{
                            fullWidth: false,
                        }}
                        SelectProps={{
                            value: language,
                            onChange: v => {
                                if (isNonBlank(v)) setLanguage(v)
                            },
                        }}
                    />
                </Stack>}
            top={
                <Breadcrumbs
                    onHomeClick={() => navigate('/')}
                    items={[
                        {label: 'Localization'},
                    ]}
                />
            }
        >
            <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 6}}>
                    <Stack spacing={2}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {t('localization.title')}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {t('localization.greeting')}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {t('localization.description')}
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Enum Translation</Typography>

                                <Typography variant="subtitle2" gutterBottom>Status</Typography>
                                <Stack direction="row" spacing={1} mb={2}>
                                    {STATUS_VALUES.map(s => (
                                        <Chip key={s} label={e('status', s)} />
                                    ))}
                                </Stack>

                                <Typography variant="subtitle2" gutterBottom>Priority</Typography>
                                <Stack direction="row" spacing={1}>
                                    {PRIORITY_VALUES.map(p => (
                                        <Chip key={p} label={e('priority', p)} variant="outlined" />
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>

                <Grid size={{xs: 12, sm: 6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Date & Time</Typography>

                            <Stack gap={2} my={1}>
                                <CommonDatePicker
                                    label="Pick a date"
                                    locale={language}
                                    DatePickerProps={{value: date, onChange: setDate}}
                                />

                                <Switch
                                    label="Show time"
                                    SwitchProps={{
                                        checked: showTime,
                                        onChange: setShowTime,
                                    }}
                                />

                                {showTime
                                    ? (
                                        <Typography variant="h4">
                                            <DateTimeDisplay value={date?.toJSON() ?? dayjs().toJSON()} locale={language} />
                                        </Typography>
                                    )
                                    : (
                                        <Typography variant="h4">
                                            <DateDisplay value={date?.toJSON() ?? dayjs().toJSON()} locale={language} />
                                        </Typography>
                                    )
                                }
                            </Stack>

                            <Typography variant="body2" color="textSecondary">
                                Locale: {language}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Body>
    );
}

export default function LocalizationPage() {
    return (
        <LocalizationProvider>
            <LocalizationContent />
        </LocalizationProvider>
    );
}
