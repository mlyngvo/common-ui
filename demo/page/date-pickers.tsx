import React from 'react';
import {Box, Container, FormControl, FormHelperText, FormLabel, Input, Sheet} from '@mui/joy';
import dayjs from 'dayjs';
import {CommonDatePicker, CommonDateTimePicker, CommonTimePicker} from '../../src';

export function DemoDatePickers() {

    return (
        <Container>
            <Sheet variant="outlined" sx={{ p: 3 }}>
                <FormControl>
                    <FormLabel>Label</FormLabel>
                    <Input placeholder="Placeholder" />
                    <FormHelperText>This is a helper text.</FormHelperText>
                </FormControl>
                <Box my={3} />
                <CommonDatePicker locale="de" value={dayjs()} />
                <Box my={3} />
                <CommonDateTimePicker locale="en" value={dayjs()} />
                <Box my={3} />
                <CommonTimePicker locale="vi" value={dayjs()} />
            </Sheet>
        </Container>
    );
}