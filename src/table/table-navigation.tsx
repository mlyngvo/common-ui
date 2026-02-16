import React from "react";
import {Box, Button, TablePagination, TablePaginationProps, Typography} from "@mui/material";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {SpringPageable} from "../data/page";

interface TableNavigationProps<T> {
    totalElements: number;
    pageable: SpringPageable<T>;
    onPageNumber: (page: number) => void;
    onPageSize: (size: number) => void;
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
                        mr: 1.5,
                        ml: 4.5
                    }}
                >
                    {new Array(totalPages).fill(0).map((_, i) => (
                        <Button
                            key={'page-' + i}
                            size="small"
                            color="inherit"
                            sx={{ px: '0.6rem', py: '0.05rem', minWidth: 'auto' }}
                            variant={i === page ? 'outlined' : 'text'}
                            onClick={() => onPageNumber(i)}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        size="small"
                        color="inherit"
                        sx={{ px: '0.6rem', py: '0.2rem', minWidth: 'auto' }}
                    >
                        <ArrowBackIosRoundedIcon fontSize="inherit" />
                    </Button>
                    <Button
                        size="small"
                        color="inherit"
                        sx={{ px: '0.6rem', py: '0.2rem', minWidth: 'auto' }}
                    >
                        <ArrowForwardIosRoundedIcon fontSize="inherit" />
                    </Button>
                </Box>
            )}
        />
    )
}