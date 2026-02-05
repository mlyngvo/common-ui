import {Card, CardContent, Grid, Stack, Typography} from '@mui/material';
import dayjs, {Dayjs} from "dayjs";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

import {
    Body, Breadcrumbs,
    CommonDatePicker, DateDisplay,
    DateTimeDisplay,
    PageTitle, Switch
} from '../../src';

export default function DisplayPage() {
    const navigate = useNavigate();

    const [showTime, setShowTime] = useState(false);
    const [date, setDate] = useState<Dayjs|null>(null);

    return (
        <Body
            title={<PageTitle title="Display" />}
            top={
                <Breadcrumbs
                    onHomeClick={() => navigate('/')}
                    items={[
                        { label: 'Display' },
                    ]}
                />
            }
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack spacing={2}>
                        <Card>
                            <CardContent>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Date & Time Display</Typography>

                                <Stack gap={2} my={1}>
                                    <CommonDatePicker
                                        label="Pick a date"
                                        DatePickerProps={{ value: date, onChange: setDate }}
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
                                                <DateTimeDisplay value={date?.toJSON() ?? dayjs().toJSON()} />
                                            </Typography>
                                        )
                                        : (
                                        <Typography variant="h4">
                                            <DateDisplay value={date?.toJSON() ?? dayjs().toJSON()} />
                                        </Typography>
                                        )
                                    }
                                </Stack>

                                <Typography variant="body2" color="textSecondary">Locale: navigator.language</Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Body>
    );
}
