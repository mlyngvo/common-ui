import React from 'react';
import {Box, Container, FormControl, FormLabel, Sheet} from '@mui/joy';
import dayjs from 'dayjs';
import {CommonDatePicker, CommonDateTimePicker, CommonTimePicker} from '../../src';

export function DemoDatePickers() {

    return (
        <Container>
            <Sheet variant="outlined" sx={{ p: 3 }}>
                <FormControl>
                    <FormLabel>Date Picker</FormLabel>
                    <CommonDatePicker locale="de" value={dayjs()} />
                </FormControl>
                <Box my={3} />
                <FormControl>
                    <FormLabel>Date Time Picker</FormLabel>
                    <CommonDateTimePicker locale="en" value={dayjs()} />
                </FormControl>
                <Box my={3} />
                <FormControl>
                    <FormLabel>Time Picker</FormLabel>
                    <CommonTimePicker locale="vi" value={dayjs()} />
                </FormControl>
            </Sheet>
        </Container>
    );
}