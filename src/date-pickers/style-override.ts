import {
    type DatePickerSlotProps,
    type DateTimePickerSlotProps,
    type TimePickerSlotProps
} from '@mui/x-date-pickers';
import {type Dayjs} from 'dayjs';

export function useStyleOverride(id: string, _hasDate?: boolean, _hasTime?: boolean) {
    void _hasDate;
    void _hasTime;
    const base: DatePickerSlotProps<Dayjs, false>|DateTimePickerSlotProps<Dayjs, false>|TimePickerSlotProps<Dayjs, false> = {
        textField: {
            InputProps: {
                id,
                size: "small",
                fullWidth: true
            }
        //         sx: {
        //             fontFamily: theme.typography.body1.fontFamily,
        //             color: theme.palette.text.primary,
        //             '& input': {
        //                 fontSize: theme.typography.body2.fontSize,
        //                 padding: '0.1rem 2rem 0.1rem 1rem',
        //                 minHeight: '2.25rem',
        //             },
        //             '& fieldset': {
        //                 borderRadius: '5px',
        //                 borderColor: `${theme.palette.grey.}`,
        //             },
        //             '&.Mui-focused fieldset': {
        //                 borderColor: `${theme.palette.focusVisible} !important`,
        //             },
        //             '&:hover fieldset': {
        //                 borderColor: `${theme.palette.primary.outlinedBorder} !important`,
        //             }
        //         }
        //     }
        },
        // openPickerButton: {
        //     sx: {
        //         color: theme.palette.text.primary
        //     }
        // },
        // desktopPaper: {
        //     sx: {
        //         background: 'none',
        //         boxShadow: 'none',
        //         mt: 1
        //     }
        // },
        // layout: {
        //     sx: {
        //         backgroundColor: theme.palette.background.surface,
        //         border: `1px solid ${theme.palette.neutral.outlinedBorder}`,
        //         borderRadius: '10px',
        //         overflow: 'hidden',
        //     }
        // }
    };
    // if (hasDate) {
    //     base.leftArrowIcon = { sx: { color: theme.palette.text.primary } };
    //     base.rightArrowIcon = { sx: { color: theme.palette.text.primary } };
    //     (base as DatePickerSlotProps<Dayjs, false>).switchViewButton = { sx: { color: theme.palette.text.primary } };
    //     base.layout = {
    //         ...base.layout,
    //         sx: {
    //             ...(base.layout?.sx),
    //             '& .MuiPickersCalendarHeader-label, & .MuiDayCalendar-weekDayLabel, & .MuiPickersDay-root, & .MuiPickersYear-root button': {
    //                 fontFamily: theme.typography.body1.fontFamily,
    //                 color: theme.palette.text.primary,
    //             },
    //             '& .MuiPickersDay-root': {
    //                 borderRadius: '7px',
    //                 '&.MuiPickersDay-today': {
    //                     borderColor: theme.palette.primary.solidBg,
    //                     color: theme.palette.primary.solidBg,
    //                 },
    //                 '&.Mui-selected': {
    //                     backgroundColor: `${theme.palette.primary.solidBg} !important`,
    //                     color: `${theme.palette.primary.solidColor} !important`,
    //                 },
    //             },
    //             '& .MuiPickersYear-root': {
    //                 '& button': {
    //                     fontSize: theme.typography.body2.fontSize,
    //                 },
    //                 '& .Mui-selected': {
    //                     color: `${theme.palette.primary.solidColor} !important`,
    //                     borderRadius: '7px',
    //                     backgroundColor: `${theme.palette.primary.solidBg} !important`,
    //                 },
    //             }
    //         }
    //     };
    // }
    // if (hasTime) {
    //     base.layout = {
    //         ...base.layout,
    //         sx: {
    //             ...(base.layout?.sx),
    //             '& .MuiMultiSectionDigitalClockSection-item': {
    //                 fontFamily: theme.typography.body1.fontFamily,
    //                 fontSize: theme.typography.body2.fontSize,
    //                 color: theme.palette.text.primary,
    //                 '&.Mui-selected': {
    //                     color: theme.palette.primary.solidColor,
    //                     borderRadius: '7px',
    //                     background: `${theme.palette.primary.solidBg} !important`,
    //                 }
    //             },
    //             '& .MuiPickersLayout-actionBar': {
    //                 pt: 2,
    //                 '& .MuiButtonBase-root': {
    //                     fontFamily: theme.typography.body1.fontFamily,
    //                     fontSize: theme.typography.body2.fontSize,
    //                     fontWeight: theme.fontWeight.md,
    //                     background: theme.palette.primary.solidBg,
    //                     color: theme.palette.primary.solidColor,
    //                     padding: '0.2rem 1rem'
    //                 }
    //             }
    //         }
    //     };
    // }
    return base;
}