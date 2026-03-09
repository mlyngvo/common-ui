import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import {
    Dialog,
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    useMediaQuery
} from "@mui/material";
import React, {type ReactElement, type ReactNode, useState} from "react";

import {SortKey, SpringPage, SpringPageable} from "../data";
import {Input} from "../form";
import {isNonBlank} from "../utils/strings";
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
    onFilter?: (filter: Record<string, string|number>) => void;
    searchKey?: string;
    filterInputs?: ReactNode;
    stickyLastColumn?: boolean;
}

export function DataTable<T>(props: DataTableProperties<T>) {
    const {
        page,
        loading,
        error,
        headers,
        pageable: {
            sort: pSort,
            filter: pFilter,
        } = {},
        renderTableRows,
        renderListRows,
        stickyLastColumn = false,
        onSort,
        onFilter,
        searchKey,
        filterInputs,
        onPageNumber,
        onPageSize,
    } = props;
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const sortableHeaders = headers.filter(h => h.sortKey !== undefined);

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
                <Stack direction="column" sx={{ height: '100%', minHeight: 0 }}>
                    {(Boolean(searchKey) && onFilter != null || filterInputs != null || sortableHeaders.length > 0 && onSort != null) && (
                        <>
                            <Stack direction="row" gap={1} sx={{ px: 1, pt: 1, mb: 1 }} alignItems="flex-end">
                                {searchKey != null && searchKey !== '' && onFilter != null && (
                                    <SearchBar
                                        searchKey={searchKey}
                                        filter={pFilter}
                                        onFilter={onFilter}
                                    />
                                )}
                                {filterInputs != null && (
                                    <MobileFilterButton filter={pFilter}>
                                        {filterInputs}
                                    </MobileFilterButton>
                                )}
                                {sortableHeaders.length > 0 && onSort != null && (
                                    <MobileSortButton
                                        headers={sortableHeaders}
                                        getSortDirection={getSortDirection}
                                        onSort={handleSort}
                                    />
                                )}
                            </Stack>
                            <Divider />
                        </>
                    )}
                    <TableItemList
                        {...{
                            loading,
                            items: page?.content,
                            renderListRows,
                            sx: { flex: 1, overflow: 'auto' },
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
                </Stack>
            )}
            {!isMobile && (
                <Stack
                    direction="column"
                    sx={{ height: '100%', minHeight: 0 }}
                >
                    {(Boolean(searchKey) && onFilter != null || filterInputs != null) && (
                        <Stack
                            direction="row"
                            gap={1}
                            sx={{ px: 1, py: 1 }}
                            alignItems="center"
                        >
                            {searchKey != null && searchKey !== '' && onFilter != null && (
                                <SearchBar
                                    searchKey={searchKey}
                                    filter={pFilter}
                                    onFilter={onFilter}
                                />
                            )}
                            {filterInputs}
                        </Stack>
                    )}
                    <TableContainer
                        sx={{ flex: 1, overflow: 'auto' }}
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

interface SearchBarProps {
    searchKey: string;
    filter: Record<string, string|number> | undefined;
    onFilter: (filter: Record<string, string|number>) => void;
}

function SearchBar({ searchKey, filter, onFilter }: SearchBarProps) {
    const [value, setValue] = useState(() => {
        const current = filter?.[searchKey];
        return current !== undefined ? String(current) : '';
    });

    const [prevFilterJson, setPrevFilterJson] = useState(() => JSON.stringify(filter));
    const filterJson = JSON.stringify(filter);
    if (filterJson !== prevFilterJson) {
        setPrevFilterJson(filterJson);
        const current = filter?.[searchKey];
        setValue(current !== undefined ? String(current) : '');
    }

    function handleApply() {
        const updated = Object.fromEntries(
            Object.entries(filter ?? {}).filter(([k]) => k !== searchKey)
        );
        const trimmed = value.trim();
        if (trimmed) {
            updated[searchKey] = trimmed;
        }
        onFilter(updated);
    }

    function handleClear() {
        setValue('');
        const updated = Object.fromEntries(
            Object.entries(filter ?? {}).filter(([k]) => k !== searchKey)
        );
        onFilter(updated);
    }

    return (
        <Input
            label="Search"
            InputProps={{
                value,
                onChange: setValue,
                onKeyDown: e => { if (e.key === 'Enter') handleApply(); },
                sx: { flex: 1 },
                slotProps: {
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                {isNonBlank(value) && (
                                    <IconButton size="small" onClick={handleClear} edge="end">
                                        <ClearRoundedIcon fontSize="small" />
                                    </IconButton>
                                )}
                                <IconButton size="small" onClick={handleApply} edge="end">
                                    <SearchRoundedIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }
            }}
        />
    );
}

function MobileFilterButton({ children, filter }: { children: ReactNode; filter: Record<string, string|number> | undefined }) {
    const [open, setOpen] = useState(false);

    const [prevFilterJson, setPrevFilterJson] = useState(() => JSON.stringify(filter));
    const filterJson = JSON.stringify(filter);
    if (filterJson !== prevFilterJson) {
        setPrevFilterJson(filterJson);
        setOpen(false);
    }

    return (
        <>
            <IconButton size="small" onClick={() => setOpen(true)}>
                <FilterListRoundedIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Filters</DialogTitle>
                <Stack direction="column" gap={2} sx={{ px: 3, pb: 3 }}>
                    {children}
                </Stack>
            </Dialog>
        </>
    );
}

interface MobileSortButtonProps<T> {
    headers: Array<DataTableHeaderItem<T>>;
    getSortDirection: (sortKey: keyof T) => 'asc' | 'desc' | undefined;
    onSort: (sortKey: keyof T) => void;
}

function MobileSortButton<T>({ headers, getSortDirection, onSort }: MobileSortButtonProps<T>) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <IconButton
                size="small"
                onClick={() => setOpen(true)}
            >
                <SortRoundedIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Sort by</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {headers.map(({ label, sortKey }) => {
                        if (sortKey === undefined) return null;
                        const direction = getSortDirection(sortKey);
                        return (
                            <ListItemButton
                                key={String(sortKey)}
                                onClick={() => {
                                    onSort(sortKey);
                                    setOpen(false);
                                }}
                                selected={direction !== undefined}
                            >
                                <ListItemText primary={label} />
                                {direction !== undefined && (
                                    <ListItemIcon sx={{ minWidth: 'auto' }}>
                                        <TableSortLabel
                                            active
                                            direction={direction}
                                        />
                                    </ListItemIcon>
                                )}
                            </ListItemButton>
                        );
                    })}
                </List>
            </Dialog>
        </>
    );
}