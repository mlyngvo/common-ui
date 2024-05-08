import React, {type ReactElement} from 'react';
import {
    Select as MuiSelect,
    FormControl,
    FormLabel,
    type SelectProps as MuiSelectProperties,
    type FormControlProps,
    Option, IconButton
} from '@mui/joy';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export interface SelectProperties<T> {
    label: string;
    options: T[];
    renderOption?: (option: T, index: number) => ReactElement;
    emptyValue?: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    SelectProps?: MuiSelectProperties<T & {}, false> & { onClear?: () => void };
    FormControlProps?: FormControlProps;
    i18n?: {
        allLabel?: string;
    }
}

export function Select<T>(properties: SelectProperties<T>) {
    const {
        label,
        options,
        renderOption,
        emptyValue = false,
        SelectProps: {
            sx,
            value,
            onClear,
            ...selectProperties
        } = {},
        FormControlProps,
        i18n: {
            allLabel
        } = {}
    } = properties;
    return (
        <FormControl {...FormControlProps}>
            <FormLabel
                sx={{
                    typography: 'body-sm',
                    fontWeight: 600
                }}
            >
                {label}
            </FormLabel>
            <MuiSelect
                sx={{
                    bgcolor: 'background.body',
                    ...sx
                }}
                {...selectProperties}
                value={
                    // eslint-disable-next-line unicorn/no-null
                    value ?? null
                }
                {...((emptyValue && value !== undefined && value !== null) && {
                    endDecorator: (
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="neutral"
                            onMouseDown={(event) => {
                                event.stopPropagation();
                            }}
                            onClick={onClear}
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    )
                })}
            >
                {emptyValue && <Option value="">{allLabel ?? 'All'}</Option>}
                {options.map((o, index) =>
                    renderOption === undefined
                        ? <Option key={String(o)} value={o}>{String(o)}</Option>
                        : renderOption(o, index)
                )}
            </MuiSelect>
        </FormControl>
    );
}