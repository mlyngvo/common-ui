import React, {type ReactElement, useMemo} from 'react';
import {
    Alert,
    Box, Button, CircularProgress,
    Dropdown, IconButton, iconButtonClasses, LinearProgress,
    Link, List, ListItem, Menu, MenuButton, MenuItem,
    Sheet,
    Table as MuiTable, Tooltip,
    Typography
} from '@mui/joy';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import WarningIcon from '@mui/icons-material/Warning';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {type Page, type Pageable, type SortKey} from './use-pagination';

interface DataTableHeaderItem<T> {
    sortKey?: Array<keyof T>;
    label: string;
    width?: number;
}

interface DataTableProperties<T> {
    page: Page<T>|undefined;
    loading: boolean;
    error: Error|undefined;
    pageable: Pageable<T>;
    headers: Array<DataTableHeaderItem<T>>;
    onSort: (sortKey: SortKey<T>) => void;
    onPageNumber: (number: number) => void;
    onPageSize: (size: number) => void;
    onClear: () => void;
    onReload: () => void;
    renderTableRow: (item: T) => ReactElement;
    renderListRow: (item: T) => ReactElement;
    oneIndexed?: boolean;
    i18n?: {
        next?: string;
        prev?: string;
        selectPage?: string;
        pagePrefix?: string;
        pageSize?: string;
        resetTable?: string;
        reloadData?: string;
    }
}

export function DataTable<T>(properties: DataTableProperties<T>) {
    const {
        page,
        loading,
        error,
        pageable: {
            pageSize: pSize,
            sort: pSort
        },
        headers,
        onSort,
        onPageNumber,
        onPageSize,
        onClear,
        onReload,
        renderTableRow,
        renderListRow,
        oneIndexed = false,
        i18n: {
            next,
            prev,
            selectPage,
            pagePrefix,
            pageSize,
            resetTable,
            reloadData,
        } = {}
    } = properties;

    const {
        activePage,
        totalPages,
        startPages,
        endPages,
        betweenPages,
        activeInBetweenPages,
        fullPages,
    } = useMemo(() => {
        const indexActivePage = (page?.number ?? 0) + (oneIndexed ? 0 : 1);
        if (page === undefined) {
            return {
                activePage: indexActivePage
            };
        }
        const indexTotalPages = page.totalPages + (oneIndexed ? 0 : 1);
        if (indexTotalPages > 6) {
            const indexStartPages = [1, 2, 3];
            const indexEndPages = [2, 1, 0].map(index => indexTotalPages - index);
            const indexBetweenPages: number[] = [];
            // eslint-disable-next-line no-plusplus
            for (let index = 4; index < indexTotalPages - 2; index++) indexBetweenPages.push(index);
            return {
                activePage: indexActivePage,
                totalPages: indexTotalPages,
                startPages: indexStartPages,
                endPages: indexEndPages,
                betweenPages: indexBetweenPages,
                activeInBetweenPages: indexBetweenPages.includes(page.number + (oneIndexed ? 0 : 1))
            };
        }
        const indexFullPages = [];
        // eslint-disable-next-line no-plusplus
        for (let index = 1; index <= indexTotalPages; index++) indexFullPages.push(index);
        return {
            activePage: indexActivePage,
            totalPages: indexTotalPages,
            fullPages: indexFullPages
        };
    }, [page, oneIndexed]);

    function compareKey(array1: Array<keyof T>, array2: Array<keyof T>) {
        return array1.toString() === array2.toString();
    }

    function handleSort(sortKey: Array<keyof T>) {
        let sort = pSort;
        if (sort !== undefined && compareKey(sort.fields, sortKey)) {
            sort.order = (sort.order === 'asc')
                ? 'desc'
                : 'asc';
        } else {
            sort = {
                fields: sortKey,
                order: 'asc'
            };
        }
        onSort(sort);
    }

    function computeActivePageNumber(number: number) {
        return page !== undefined && page.number === (oneIndexed ? number : number - 1);
    }

    function handlePageNumber(number: number) {
        onPageNumber(number - (oneIndexed ? 0 : 1));
    }

    function handleNext() {
        handlePageNumber(activePage + 1);
    }

    function handlePrevious() {
        handlePageNumber(activePage - 1);
    }

    function handlePageSize(size: number) {
        onPageSize(size);
    }

    function renderPageButton(number: number) {
        return (
            <PageButton
                key={number}
                active={computeActivePageNumber(number)}
                number={number}
                onClick={pn => { handlePageNumber(pn); }}
                disabled={loading}
            />
        );
    }

    return (
        <>
            <Sheet
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
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
                            {headers.map(({label, sortKey, width}) => (
                                <th key={label} style={{width, padding: '12px 15px'}}>
                                    {sortKey === undefined
                                        ? label
                                        : (
                                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                            <Link
                                                underline="none"
                                                color={
                                                    pSort !== undefined && compareKey(pSort.fields, sortKey)
                                                        ? 'primary'
                                                        : 'neutral'
                                                }
                                                disabled={loading}
                                                component="button"
                                                onClick={() => { handleSort(sortKey); }}
                                                fontWeight="lg"
                                                endDecorator={<ArrowDropDownIcon />}
                                                sx={{
                                                    '& svg': {
                                                        transition: '0.2s',
                                                        transform: pSort !== undefined && compareKey(pSort.fields, sortKey) && pSort.order === 'desc'
                                                            ? 'rotate(0deg)'
                                                            : 'rotate(180deg)'
                                                    },
                                                }}
                                            >
                                                {label}
                                            </Link>
                                        )
                                    }
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
                            ? page?.content.map(item => renderTableRow(item))
                            : (
                                <tr>
                                    <td colSpan={headers.length} style={{ padding: 30 }}>
                                        <Alert
                                            variant="soft"
                                            color="danger"
                                            invertedColors
                                            startDecorator={
                                                <CircularProgress size="lg" color="danger">
                                                    <WarningIcon  />
                                                </CircularProgress>

                                            }
                                            sx={{ alignItems: 'flex-start', gap: '1rem' }}
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                <Typography level="title-md"><strong>Error</strong></Typography>
                                                <Typography level="body-md">
                                                    {error.message}
                                                </Typography>
                                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                                    <Button
                                                        variant="outlined"
                                                        size="sm"
                                                        startDecorator={<DeleteForeverRoundedIcon />}
                                                        onClick={() => { onClear(); }}
                                                    >
                                                        {resetTable ?? 'Reset table'}
                                                    </Button>
                                                    <Button
                                                        variant="solid"
                                                        size="sm"
                                                        startDecorator={<RotateLeftRoundedIcon />}
                                                        onClick={() => { onReload(); }}
                                                    >
                                                        {reloadData ?? 'Try again'}
                                                    </Button>
                                                </Box>
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
                {page?.content.map(index => renderListRow(index))}
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

            {error === undefined && (
                <>
                    <Box
                        sx={{
                            pt: 2,
                            gap: 1,
                            alignItems: 'center',
                            [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                            display: {
                                xs: 'none',
                                lg: 'flex',
                            },
                        }}
                    >
                        <Button
                            size="sm"
                            variant="outlined"
                            color="neutral"
                            startDecorator={<KeyboardArrowLeftIcon />}
                            disabled={loading || page?.number === (oneIndexed ? 1 : 0)}
                            onClick={() => { handlePrevious(); }}
                        >
                            {prev ?? 'Previous'}
                        </Button>

                        <Box sx={{ flex: 1 }} />
                        {fullPages?.map(n => renderPageButton(n))}
                        {startPages !== undefined && endPages !== undefined && betweenPages !== undefined && (
                            <>
                                {startPages.map(n => renderPageButton(n))}
                                <Dropdown>
                                    <Tooltip
                                        title={
                                            activeInBetweenPages
                                                ? `${pagePrefix ?? 'Page'} ${activePage}`
                                                : ''
                                        }
                                        placement="top"
                                        variant="outlined"
                                    >
                                        <MenuButton
                                            slots={{ root: IconButton }}
                                            slotProps={{
                                                root: {
                                                    variant: activeInBetweenPages ? 'soft' : 'plain',
                                                    color: activeInBetweenPages ? 'primary' : 'neutral',
                                                    size: 'sm',
                                                    disabled: loading,
                                                }
                                            }}
                                        >
                                            <MoreHorizRoundedIcon />
                                        </MenuButton>
                                    </Tooltip>
                                    <Menu size="sm" sx={{ minWidth: 140, maxHeight: 200 }}>
                                        <List>
                                            <ListItem sticky>
                                                <Typography
                                                    level="body-xs"
                                                    textTransform="uppercase"
                                                    fontWeight="lg"
                                                >
                                                    {selectPage ?? 'Select page'}
                                                </Typography>
                                            </ListItem>
                                            {betweenPages.map(n => (
                                                <MenuItem
                                                    key={n}
                                                    selected={computeActivePageNumber(n)}
                                                    onClick={() => { handlePageNumber(n); }}
                                                >
                                                    {pagePrefix ?? 'Page'} {n}
                                                </MenuItem>
                                            ))}
                                        </List>
                                    </Menu>
                                </Dropdown>
                                {endPages.map(n => renderPageButton(n))}
                            </>
                        )}
                        <Box sx={{ flex: 1 }} />

                        <Dropdown>
                            <MenuButton
                                variant="plain"
                                size="sm"
                                endDecorator={<ArrowDropDownIcon />}
                                disabled={loading}
                            >
                                {pageSize ?? 'Page size'}: {pSize}
                            </MenuButton>
                            <Menu>
                                <MenuItem onClick={() => { handlePageSize(10); }}>10</MenuItem>
                                <MenuItem onClick={() => { handlePageSize(25); }}>25</MenuItem>
                                <MenuItem onClick={() => { handlePageSize(50); }}>50</MenuItem>
                                <MenuItem onClick={() => { handlePageSize(100); }}>100</MenuItem>
                            </Menu>
                        </Dropdown>
                        <Button
                            size="sm"
                            variant="outlined"
                            color="neutral"
                            endDecorator={<KeyboardArrowRightIcon />}
                            disabled={loading || page?.isLast}
                            onClick={() => { handleNext(); }}
                        >
                            {next ?? 'Next'}
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: {
                                xs: 'flex',
                                lg: 'none'
                            },
                            alignItems: 'center',
                            py: 2
                        }}
                    >
                        <IconButton
                            variant="outlined"
                            color="neutral"
                            size="sm"
                            disabled={loading || page?.number === (oneIndexed ? 1 : 0)}
                            onClick={() => { handlePrevious(); }}
                        >
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        <Typography level="body-sm" mx="auto">
                            {pagePrefix ?? 'Page'} {activePage} / {totalPages ?? 0}
                        </Typography>
                        <IconButton
                            variant="outlined"
                            color="neutral"
                            size="sm"
                            disabled={loading || page?.isLast}
                            onClick={() => { handleNext(); }}
                        >
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </Box>
                </>
            )}
        </>
    );
}

interface PageButtonProperties {
    active: boolean;
    number: number;
    onClick: (number: number) => void;
    disabled: boolean;
}

function PageButton({active, number, onClick, disabled}: PageButtonProperties) {
    return <IconButton
        size="sm"
        variant={active ? 'solid' : 'outlined'}
        color={active ? 'primary' : 'neutral'}
        onClick={() => { onClick(number); }}
        disabled={disabled}
    >
        {number}
    </IconButton>;
}