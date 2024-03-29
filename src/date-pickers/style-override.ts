import {useTheme} from '@mui/joy';
import {
    type DatePickerSlotsComponentsProps,
    type DateTimePickerSlotsComponentsProps,
    type TimePickerSlotsComponentsProps
} from '@mui/x-date-pickers';

export function useStyleOverride(hasDate: boolean, hasTime: boolean) {
    const theme = useTheme();
    const base: TimePickerSlotsComponentsProps<any>|DatePickerSlotsComponentsProps<any>|DateTimePickerSlotsComponentsProps<any> = {
        textField: {
            InputProps: {
                sx: {
                    fontFamily: theme.fontFamily.body,
                    color: theme.palette.text.primary,
                    '& input': {
                        fontSize: theme.fontSize.sm,
                        padding: '0.1rem 2rem 0.1rem 1rem',
                        minHeight: '2.25rem',
                    },
                    '& fieldset': {
                        borderRadius: '5px',
                        borderColor: `${theme.palette.neutral.outlinedBorder}`,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: `${theme.palette.focusVisible} !important`,
                    }
                }
            }
        },
        openPickerButton: {
            sx: {
                color: theme.palette.text.primary
            }
        },
        desktopPaper: {
            sx: {
                background: 'none !important'
            }
        },
        layout: {
            sx: {
                backgroundColor: theme.palette.background.surface,
                border: `1px solid ${theme.palette.neutral.outlinedBorder}`,
                borderRadius: '10px',
                overflow: 'hidden'
            }
        }
    };
    if (hasDate) {
        base.leftArrowIcon = { sx: { color: theme.palette.text.primary } };
        base.rightArrowIcon = { sx: { color: theme.palette.text.primary } };
        (base as DatePickerSlotsComponentsProps<any>).switchViewButton = { sx: { color: theme.palette.text.primary } };
        base.layout = {
            ...base.layout,
            sx: {
                ...(base.layout?.sx),
                '& .MuiPickersCalendarHeader-label, & .MuiDayCalendar-weekDayLabel, & .MuiPickersDay-root, & .MuiPickersYear-root button': {
                    fontFamily: theme.fontFamily.body,
                    color: theme.palette.text.primary,
                },
                '& .MuiPickersDay-root': {
                    '&.Mui-selected': {
                        borderRadius: '7px',
                        backgroundColor: `${theme.palette.primary.solidBg} !important`,
                    },
                },
                '& .MuiPickersYear-root': {
                    '& button': {
                        fontSize: theme.fontSize.sm,
                    },
                    '& .Mui-selected': {
                        borderRadius: '7px',
                        backgroundColor: `${theme.palette.primary.solidBg} !important`,
                    },
                }
            }
        };
    }
    if (hasTime) {
        base.layout = {
            ...base.layout,
            sx: {
                ...(base.layout?.sx),
                '& .MuiMultiSectionDigitalClockSection-item': {
                    fontFamily: theme.fontFamily.body,
                    fontSize: theme.fontSize.sm,
                    color: theme.palette.text.primary,
                    '&.Mui-selected': {
                        borderRadius: '7px',
                        background: `${theme.palette.primary.solidBg} !important`,
                    }
                },
                '& .MuiPickersLayout-actionBar': {
                    pt: 2,
                    '& .MuiButtonBase-root': {
                        fontFamily: theme.fontFamily.body,
                        fontSize: theme.fontSize.sm,
                        fontWeight: theme.fontWeight.md,
                        background: theme.palette.primary.solidBg,
                        color: theme.palette.text.primary,
                        padding: '0.2rem 1rem'
                    }
                }
            }
        };
    }
    return base;
}