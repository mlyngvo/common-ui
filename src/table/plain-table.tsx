import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery
} from "@mui/material";
import React, {type ReactElement} from "react";

import {TableItemList, TableItemRows} from "./share";


interface PlainTableHeaderItem {
    label: string;
    width?: number;
}

export interface PlainTableProperties<T> {
    items: T[]|undefined;
    loading: boolean;
    error: Error|null|undefined;
    headers: PlainTableHeaderItem[];
    renderTableRows: (item: T, index: number) => ReactElement;
    renderListRows: (item: T, index: number) => ReactElement;
    stickyLastColumn?: boolean;
}

export function PlainTable<T>(props: PlainTableProperties<T>) {
    const {
        items,
        loading,
        error,
        headers,
        renderTableRows,
        renderListRows,
        stickyLastColumn = false,
    } = props;

    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <>
            {isMobile && (
                <TableItemList
                    {...{
                        loading,
                        items,
                        renderListRows,
                    }}
                />
            )}
            {!isMobile && (
                <TableContainer sx={{ maxHeight: '100%' }}>
                    <Table
                        stickyHeader
                        size="small"
                        sx={theme => ({
                            minWidth: theme.breakpoints.down('sm'),
                            ...(stickyLastColumn
                                    ? {
                                        '& tr > *:last-child': {
                                            position: 'sticky',
                                            right: 0,
                                        },
                                    }
                                    : {}
                            )
                        })}
                    >
                        <TableHead>
                            <TableRow>
                                {headers.map((header, index) => (
                                    <TableCell
                                        key={index}
                                        sx={{
                                            width: header.width,
                                            fontWeight: 600,
                                            color: 'var(--template-palette-text-secondary)',
                                            background: 'var(--template-palette-divider)',
                                            borderBottom: '2px solid var(--template-palette-divider)',
                                            paddingTop: '0.39rem',
                                            paddingBottom: '0.39rem',
                                            backdropFilter: 'blur(8px)',
                                        }}
                                    >
                                        {header.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody
                            sx={{
                                '& tr > td': {
                                    borderBottom: '1px solid var(--template-palette-divider)',
                                },
                                '& tr:last-child > td': {
                                    borderBottom: 'none',
                                },
                                ...(loading
                                    ? {
                                        '& tr:not(:first-child) td': {
                                            opacity: 0.3
                                        },
                                    }
                                    : {}
                                )
                            }}
                        >
                            <TableItemRows
                                {...{
                                    error,
                                    loading,
                                    items,
                                    renderTableRows,
                                    columnLength: headers.length,
                                }}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}