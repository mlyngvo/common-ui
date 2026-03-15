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
                <TableItemList
                    {...{
                        loading,
                        items,
                        renderListRow,
                    }}
                />
            )}
            {!isMobile && (
                <TableContainer
                    sx={{
                        maxHeight: '100%',
                        border: '1px solid var(--template-palette-Table-border)',
                        borderRadius: 'var(--template-shape-borderRadius)',
                    }}
                >
                    <Table
                        stickyHeader
                        size="small"
                        sx={theme => ({
                            minWidth: theme.breakpoints.down('sm'),
                            ...(stickyLastColumn
                                    ? {
                                        '& tr > *:last-child': {
                                            position: 'sticky',
                                            right: 0
                                        },
                                        '& tbody tr > *:last-child': {
                                            backgroundColor: 'var(--template-palette-TableCell-headBackground)',
                                        },
                                    }
                                    : {}
                            )
                        })}
                    >
                        <TableHead
                        >
                            <TableRow>
                                {headers.map((header, index) => (
                                    <TableCell
                                        key={index}
                                        sx={{
                                            width: header.width,
                                            fontWeight: 600,
                                            color: 'var(--template-palette-text-secondary)',
                                            background: 'var(--template-palette-TableCell-headBackground)',
                                            borderBottom: '2px solid var(--template-palette-divider)',
                                            lineHeight: '1em',
                                            paddingTop: '0.75rem',
                                            paddingBottom: '0.75rem',
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
                                    backgroundColor: 'var(--template-palette-TableCell-dataBackground)',
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
                                    renderTableRow,
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