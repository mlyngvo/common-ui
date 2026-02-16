import {
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow,
    TableSortLabel,
    useMediaQuery
} from "@mui/material";
import {ReactElement} from "react";
import React from "react";

import {SortKey, SpringPage, SpringPageable} from "../data/page";
import {TableItemList, TableItemRows} from "./share";
import {TableNavigation, TableNavigationCompact} from "./table-navigation";

interface DataTableHeaderItem<T> {
    label: string;
    width?: number;
    sortKey?: keyof T;
}

export interface DataTableProperties<T> {
    page: SpringPage<T>|undefined;
    loading: boolean;
    error: Error|null|undefined;
    headers: Array<DataTableHeaderItem<T>>;
    pageable: SpringPageable<T>|undefined;
    renderTableRows: (item: T, index: number) => ReactElement;
    renderListRows: (item: T, index: number) => ReactElement;
    onPageNumber: (page: number) => void;
    onPageSize: (size: number) => void;
    onSort?: (sortKey: SortKey<T>, removeSortKey?: boolean) => void;
    stickyLastColumn?: boolean;
}

export function DataTable<T>(props: DataTableProperties<T>) {
    const {
        page,
        loading,
        error,
        headers,
        pageable: {
            size: pSize,
            sort: pSort,
            filter: pFilter,
        } = {},
        renderTableRows,
        renderListRows,
        stickyLastColumn = false,
        onSort,
        onPageNumber,
        onPageSize,
    } = props;
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    function getSortDirection(sortKey: keyof T) {
        const currentSorts = pSort ?? [];
        for (const sort of currentSorts) {
            if (sortKey === sort.field) return sort.direction;
        }
        return undefined;
    }

    function handleSort(sortKey: keyof T) {
        // Add a new sort key if not found (starting with ascending order)
        if (pSort === undefined || pSort.size === 0) onSort?.({ field: sortKey, direction: 'asc' });
        else {
            for (const sort of pSort) {
                if (sortKey === sort.field) {
                    // Remove the sort key if the current sort key is found with descending order
                    if (sort.direction === 'desc') onSort?.(sort, true);
                    // Revert sort direction if found
                    else onSort?.({ field: sortKey, direction: 'desc' });
                    break;
                }
            }
        }
    }

    return (
        <>
            {isMobile && (
                <>
                    <TableItemList
                        {...{
                            loading,
                            items: page?.content,
                            renderListRows,
                        }}
                    />
                    {props.pageable && (
                        <TableNavigationCompact
                            {...{
                                totalElements: page?.totalElements ?? 0,
                                pageable: props.pageable,
                                onPageNumber,
                            }}
                        />
                    )}
                </>
            )}
            {!isMobile && (
                <Stack
                    direction="column"
                    sx={{ maxHeight: '100%' }}
                >
                    <TableContainer
                        sx={{ maxHeight: 'calc(100dvh - 250px)' }}
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
                                                right: 0,
                                            },
                                        }
                                        : {}
                                )
                            })}
                        >
                            <TableHead>
                                <TableRow>
                                    {headers.map(({label, sortKey, width}, index) => (
                                        <TableCell
                                            key={index}
                                            sx={{
                                                width,
                                                fontWeight: 600,
                                                color: 'var(--template-palette-text-secondary)',
                                                background: 'var(--template-palette-divider)',
                                                borderBottom: '2px solid var(--template-palette-divider)',
                                                paddingTop: '0.39rem',
                                                paddingBottom: '0.39rem',
                                                backdropFilter: 'blur(8px)',
                                            }}
                                        >
                                            {sortKey === undefined
                                                ? <span style={{ color: 'var(--template-palette-text-secondary)', }}>{label}</span>
                                                : (
                                                    <TableSortLabel
                                                        active={getSortDirection(sortKey) !== undefined}
                                                        direction={getSortDirection(sortKey)}
                                                        onClick={() => handleSort(sortKey)}
                                                    >
                                                        {label}
                                                    </TableSortLabel>
                                                )
                                            }
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
                                        items: page?.content,
                                        renderTableRows,
                                        columnLength: headers.length,
                                    }}
                                />
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {props.pageable && (
                        <TableNavigation
                            {...{
                                totalElements: page?.totalElements ?? 0,
                                pageable: props.pageable,
                                onPageSize,
                                onPageNumber
                            }}
                        />
                    )}
                </Stack>
            )}
        </>
    )
}