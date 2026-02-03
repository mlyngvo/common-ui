import {Card, CardContent, Grid, Stack} from "@mui/material";
import {Dayjs} from "dayjs";
import React, {useState} from "react";
import {useAsync} from "react-async-hook";
import {useNavigate} from "react-router-dom";

import {
    Autocomplete,
    Body,
    Breadcrumbs,
    Checkbox, CommonDatePicker,
    CommonDateTimePicker,
    CommonTimePicker, Input,
    PageTitle,
    Radio,
    Select, Switch
} from "../../src";
import {mockFetch} from "../utils";

export default function FormPage() {
    const navigate = useNavigate();

    const standardSet = [
        { id: 1, radio: 'Apple', text: 'Option 1', value: 'option_1' },
        { id: 2, radio: '🍌 + 🍊', text: 'Option 2', value: 'option_2' },
        { id: 3, radio: 'Fruits 🌴', text: 'Option 3', value: 'option_3' },
    ];

    const asyncSet = [
        { label: 'Promise 1', value: 'promise_1' },
        { label: 'Promise 2', value: 'promise_2' },
        { label: 'Promise 3', value: 'promise_3' },
    ];
    const [asyncSelect, setAsyncSelect] = useState<string>();
    const {loading: asyncSetLoading, result: asyncSetResult} = useAsync(() => mockFetch(asyncSet), []);

    function handleAsyncChange(value: string|number|undefined) {
        setAsyncSelect(asyncSet.find(s => s.value === value)?.value);
    }

    const autoSet = [
        { model: 'Sedan', label: 'Audi RS4' },
        { model: 'SUV', label: 'Mercedes Benz GLA' },
    ];

    const asyncSearchSet = [
        { id: 1, name: 'Foo', value: 'Bar' },
        { id: 2, name: 'Coolio', value: 'Moo' },
        { id: 3, name: 'James', value: 'Smith' },
    ];
    const [asyncSearchSelect, setAsyncSearchSelect] = useState<typeof asyncSearchSet[0]|null>(null);
    const [asyncSearchString, setAsyncSearchString] = useState('');
    const {loading: asyncSearchLoading, result: asyncSearchResult} = useAsync(() => {
        return mockFetch(
            asyncSearchSet
                .filter(({name, value}) =>
                    name.toLowerCase().includes(asyncSearchString.toLowerCase())
                    || value.toLowerCase().includes(asyncSearchString.toLowerCase())
                )
        );
    }, [asyncSearchString]);

    const [date, setDate] = useState<Dayjs|null>(null);

    return (
        <Body
            title={<PageTitle title="Form" />}
            top={
                <Breadcrumbs
                    onHomeClick={() => navigate('/')}
                    items={[
                        { label: 'Form' },
                    ]}
                />
            }
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack spacing={2}>
                        <Card>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Input
                                        label="Standard Input"
                                        FormControlProps={{ fullWidth: true }}
                                    />
                                    <Input
                                        label="Textarea"
                                        FormControlProps={{ fullWidth: true }}
                                        InputProps={{ multiline: true, rows: 5 }}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Radio
                                        label="Radio Group"
                                        options={standardSet.map(o => ({ label: o.radio, value: o.value }))}
                                    />
                                    <Radio
                                        label="Horizontal Group"
                                        options={standardSet.map(o => ({ label: o.radio, value: o.value }))}
                                        RadioProps={{ row: true }}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Checkbox
                                        label="Standard Checkbox"
                                    />
                                    <Switch
                                        label="Standard Switch"
                                        SwitchProps={{ color: 'success' }}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack spacing={2}>
                        <Card>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Select
                                        label="Standard Select"
                                        options={standardSet.map(o => ({ label: o.value, value: o.id }))}
                                    />
                                    <Select
                                        label="Async Select"
                                        options={asyncSetResult ?? []}
                                        loading={asyncSetLoading}
                                        helperText={asyncSelect !== undefined ? `Selected: ${asyncSelect}` : undefined}
                                        SelectProps={{
                                            value: asyncSelect,
                                            onChange: handleAsyncChange,
                                        }}
                                    />
                                    <Autocomplete
                                        label="Autocomplete"
                                        options={autoSet}
                                    />
                                    <Autocomplete
                                        label="Async Autocomplete"
                                        options={asyncSearchResult ?? []}
                                        loading={asyncSearchLoading}
                                        onSearch={setAsyncSearchString}
                                        AutocompleteProps={{
                                            filterOptions: o => o,
                                            getOptionLabel: o => o.name,
                                            value: asyncSearchSelect,
                                            onChange: v => setAsyncSearchSelect(v),
                                            isOptionEqualToValue: (o, v) => o.id == v.id,
                                        }}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Stack spacing={2}>
                                    <CommonDatePicker
                                        label="Date Picker"
                                        DatePickerProps={{
                                            value: date,
                                            onChange: setDate
                                        }}
                                    />
                                    <CommonTimePicker
                                        label="Time Picker"
                                    />
                                    <CommonDateTimePicker
                                        label="Date Time Picker"
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Body>
    )
}