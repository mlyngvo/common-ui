import {Alert, LinearProgress, ListItem, ListItemText, Stack, TableCell, TableRow, Typography} from "@mui/material";
import React, {type ReactElement} from "react";

interface TableItemListProps<T> {
    loading: boolean;
    items: T[]|undefined;
    renderListRows: (item: T, index: number) => ReactElement;
}

export function TableItemList<T>({ loading, items, renderListRows }: TableItemListProps<T>) {
    return (
        <Stack direction="column" component="ul" sx={{ p: 0, m: 0 }}>
            {loading && <LinearProgress />}
            {items?.map(renderListRows)}
            {items && items.length === 0 && (
                <ListItem>
                    <ListItemText>
                        No items found in the list.
                    </ListItemText>
                </ListItem>
            )}
        </Stack>
    )
}

interface TableItemRowsProps<T> {
    error: Error|null|undefined;
    loading: boolean;
    items: T[]|undefined;
    renderTableRows: (item: T, index: number) => ReactElement;
    columnLength: number;
}

export function TableItemRows<T>({error, loading, items, renderTableRows, columnLength}: TableItemRowsProps<T>) {
    return (
        <>
            {loading && (
                <TableRow>
                    <TableCell colSpan={columnLength} sx={{ p: 0 }}>
                        <LinearProgress sx={{ borderRadius: 0 }} />
                    </TableCell>
                </TableRow>
            )}
            {error && (
                <TableRow>
                    <TableCell colSpan={columnLength}>
                        <Alert
                            variant="outlined"
                            severity="error"
                        >
                            <Typography>{error.message ?? "Error"}</Typography>
                        </Alert>
                    </TableCell>
                </TableRow>
            )}
            {items?.map(renderTableRows)}
        </>
    )
}