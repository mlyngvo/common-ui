import {
    Alert,
    LinearProgress, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography,
    useMediaQuery
} from "@mui/material";
import React, {type ReactElement} from "react";


interface PlainTableHeaderItem {
    label: string;
    width?: number;
}

export interface PlainTableProperties<T> {
    items: T[]|undefined;
    loading: boolean;
    error: Error|null|undefined;
    headers: PlainTableHeaderItem[];
    renderTableRow: (item: T, index: number) => ReactElement;
    renderListRow: (item: T, index: number) => ReactElement;
    stickyLastColumn?: boolean;
}

export function PlainTable<T>(props: PlainTableProperties<T>) {
    const {
        items,
        loading,
        error,
        headers,
        renderTableRow,
        renderListRow,
        stickyLastColumn = false,
    } = props;

    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <>
            {isMobile && (
                <Stack direction="column" component="ul" sx={{ p: 0, m: 0 }}>
                    {items?.map((item, index) => renderListRow(item, index))}
                </Stack>
            )}
            {!isMobile && (
                <TableContainer>
                    <Table
                        size="small"
                        sx={{
                            minWidth: 650,
                            ...(stickyLastColumn
                                    ? {
                                        '& tr > *:last-child': {
                                            position: 'sticky',
                                            right: 0,
                                            bgcolor: 'var(--TableCell-headBackground)',
                                        },
                                    }
                                    : {}
                            )
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                {headers.map((header, index) => (
                                    <TableCell key={index} style={{ width: header.width }}>
                                        {header.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {error && (
                                <TableRow>
                                    <TableCell colSpan={headers.length}>
                                        <Alert
                                            variant="outlined"
                                            severity="error"
                                        >
                                            <Typography>{error.message ?? "Error"}</Typography>
                                        </Alert>
                                    </TableCell>
                                </TableRow>
                            )}
                            {items?.map(renderTableRow)}
                            {loading && <LinearProgress />}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}