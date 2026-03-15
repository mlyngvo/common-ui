import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {Box, Button, Menu, MenuItem, TablePagination} from "@mui/material";
import React, {useState} from "react";

import {SpringPageable} from "../data";

interface TableNavigationProps<T> {
    totalElements: number;
    pageable: SpringPageable<T>;
    onPageNumber: (page: number) => void;
    onPageSize: (size: number) => void;
}

type PageItem =
    | { type: 'page'; page: number }
    | { type: 'ellipsis'; pages: number[] };

function getPageItems(totalPages: number, currentPage: number): PageItem[] {
    if (totalPages <= 8) {
        return Array.from({length: totalPages}, (_, i) => ({ type: 'page' as const, page: i }));
    }

    const visible = new Set<number>();

    // Always show first and last
    visible.add(0);
    visible.add(totalPages - 1);

    // Show the current page and its neighbours
    for (let i = Math.max(0, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        visible.add(i);
    }

    const sorted = [...visible].sort((a, b) => a - b);
    const items: PageItem[] = [];

    for (let i = 0; i < sorted.length; i++) {
        items.push({ type: 'page', page: sorted[i] });

        if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
            const hiddenPages: number[] = [];
            for (let j = sorted[i] + 1; j < sorted[i + 1]; j++) {
                hiddenPages.push(j);
            }
            items.push({ type: 'ellipsis', pages: hiddenPages });
        }
    }

    return items;
}

function EllipsisDropdown({ pages, currentPage, onSelect }: {
    pages: number[];
    currentPage: number;
    onSelect: (page: number) => void;
}) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    return (
        <>
            <Button
                size="small"
                color="inherit"
                sx={{ px: '0.6rem', py: '0.05rem', minWidth: 'auto' }}
                onClick={e => setAnchorEl(e.currentTarget)}
            >
                ...
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                slotProps={{
                    paper: {
                        sx: { maxHeight: 240 },
                    },
                }}
            >
                {pages.map(p => (
                    <MenuItem
                        key={p}
                        selected={p === currentPage}
                        onClick={() => {
                            onSelect(p);
                            setAnchorEl(null);
                        }}
                    >
                        {p + 1}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

function PageButtons({ page, totalPages, onPageNumber }: {
    page: number;
    totalPages: number;
    onPageNumber: (page: number) => void;
}) {
    const items = getPageItems(totalPages, page);

    return (
        <>
            <Button
                size="small"
                color="inherit"
                disabled={page === 0}
                sx={{ px: '0.6rem', py: '0.2rem', minWidth: 'auto' }}
                onClick={() => onPageNumber(page - 1)}
            >
                <ArrowBackIosRoundedIcon fontSize="inherit" />
            </Button>
            {items.map((item, i) =>
                item.type === 'page' ? (
                    <Button
                        key={'page-' + item.page}
                        size="small"
                        color="inherit"
                        sx={{ px: '0.6rem', py: '0.05rem', minWidth: 'auto' }}
                        variant={item.page === page ? 'outlined' : 'text'}
                        onClick={() => onPageNumber(item.page)}
                    >
                        {item.page + 1}
                    </Button>
                ) : (
                    <EllipsisDropdown
                        key={'ellipsis-' + i}
                        pages={item.pages}
                        currentPage={page}
                        onSelect={onPageNumber}
                    />
                )
            )}
            <Button
                size="small"
                color="inherit"
                disabled={page >= totalPages - 1}
                sx={{ px: '0.6rem', py: '0.2rem', minWidth: 'auto' }}
                onClick={() => onPageNumber(page + 1)}
            >
                <ArrowForwardIosRoundedIcon fontSize="inherit" />
            </Button>
        </>
    );
}

export function TableNavigationCompact<T>({ totalElements, pageable, onPageNumber }: {
    totalElements: number;
    pageable: SpringPageable<T>;
    onPageNumber: (page: number) => void;
}) {
    const totalPages = Math.ceil(totalElements / pageable.size);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 1,
            }}
        >
            <PageButtons
                page={pageable.page}
                totalPages={totalPages}
                onPageNumber={onPageNumber}
            />
        </Box>
    );
}

export function TableNavigation<T>(props: TableNavigationProps<T>) {
    const {
        totalElements,
        pageable: {
            size: pSize,
            page: pPage,
        },
        onPageNumber,
        onPageSize,
    } = props;

    const totalPages = Math.ceil(totalElements / pSize);

    return (
        <TablePagination
            component="div"
            rowsPerPageOptions={[10, 25, 50]}
            rowsPerPage={pSize}
            count={totalElements}
            page={pPage}
            onPageChange={(_, p) => onPageNumber(p)}
            onRowsPerPageChange={ev => onPageSize(parseInt(ev.target.value))}
            labelRowsPerPage={"Rows:"}
            ActionsComponent={({page}) => (
                <Box
                    sx={{
                        flexGrow: 1,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        mr: 1.5,
                        ml: 4.5,
                    }}
                >
                    <PageButtons
                        page={page}
                        totalPages={totalPages}
                        onPageNumber={onPageNumber}
                    />
                </Box>
            )}
        />
    )
}