import React, {type ReactElement} from 'react';
import {
    Alert,
    Box,
    CircularProgress,
    LinearProgress,
    Sheet,
    Table as MuiTable,
    Typography
} from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

interface PlainTableHeaderItem {
    label: string;
    width?: number;
}

interface PlainTableProperties<T> {
    items: T[]|undefined;
    loading: boolean;
    error: Error|undefined;
    headers: PlainTableHeaderItem[];
    renderTableRow: (item: T, index: number) => ReactElement;
    renderListRow: (item: T, index: number) => ReactElement;
}

export function PlainTable<T>(properties: PlainTableProperties<T>) {
    const {
        items,
        loading,
        error,
        headers,
        renderTableRow,
        renderListRow,
    } = properties;

    return (
        <>
            <Sheet
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0
                }}
            >
                <MuiTable
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px',
                    }}
                >
                    <thead>
                    <tr>
                        {headers.map(({label, width}) => (
                            <th key={label} style={{width, padding: '12px 15px'}}>
                                {label}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <Box
                        component="tbody"
                        sx={{
                            '& > tr > td': { paddingX: '15px'}
                        }}
                    >
                        {error === undefined
                            ? items?.map((item, index) => renderTableRow(item, index))
                            : (
                                <tr>
                                    <td colSpan={headers.length} style={{ padding: 30 }}>
                                        <Alert
                                            variant="soft"
                                            color="danger"
                                            invertedColors
                                            startDecorator={
                                                <CircularProgress size="lg" color="danger">
                                                    <WarningRoundedIcon  />
                                                </CircularProgress>

                                            }
                                            sx={{ alignItems: 'flex-start', gap: '1rem' }}
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                <Typography level="title-md"><strong>Error</strong></Typography>
                                                <Typography level="body-md">
                                                    {error.message}
                                                </Typography>
                                            </Box>
                                        </Alert>
                                    </td>
                                </tr>
                            )
                        }
                    </Box>
                </MuiTable>
            </Sheet>

            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                {items?.map((item, index) => renderListRow(item, index))}
            </Box>

            {loading && (
                <Box>
                    <LinearProgress
                        sx={{ flex: 0.5 }}
                        determinate={false}
                        size="md"
                        variant="soft"
                    />
                </Box>
            )}
        </>
    );
}