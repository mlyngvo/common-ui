import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import BlockIcon from '@mui/icons-material/Block';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import {
    Avatar,
    Box,
    Card,
    Chip,
    type ChipProps,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText, Stack, TableCell, TableRow,
    Typography
} from "@mui/material";
import {useQuery} from '@tanstack/react-query';
import React, {Fragment, ReactElement, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {Body, Breadcrumbs, DataTable, PageTitle, PlainTable, Switch} from '../../src';
import {serializePageable, usePagination} from "../../src/data/page";
import {mockFetchPageable} from "../utils";

const orders = [
    { 'id': 'INV-1301', 'date': 'Jan 15, 2024', 'status': 'Paid', 'customer': { 'initial': 'A', 'name': 'Amara Osei', 'email': 'amara.osei@email.com' } },
    { 'id': 'INV-1300', 'date': 'Jan 14, 2024', 'status': 'Cancelled', 'customer': { 'initial': 'L', 'name': 'Liam Chen', 'email': 'liam.chen@email.com' } },
    { 'id': 'INV-1299', 'date': 'Jan 13, 2024', 'status': 'Paid', 'customer': { 'initial': 'S', 'name': 'Sofia Petrov', 'email': 'sofia.p@email.com' } },
    { 'id': 'INV-1298', 'date': 'Jan 12, 2024', 'status': 'Refunded', 'customer': { 'initial': 'M', 'name': 'Marcus Webb', 'email': 'marcus.w@email.com' } },
    { 'id': 'INV-1297', 'date': 'Jan 11, 2024', 'status': 'Paid', 'customer': { 'initial': 'E', 'name': 'Elena Vasquez', 'email': 'elena.v@email.com' } },
    { 'id': 'INV-1296', 'date': 'Jan 10, 2024', 'status': 'Cancelled', 'customer': { 'initial': 'D', 'name': 'Daniel Okoro', 'email': 'dan.okoro@email.com' } },
    { 'id': 'INV-1295', 'date': 'Jan 9, 2024', 'status': 'Paid', 'customer': { 'initial': 'H', 'name': 'Hannah Fischer', 'email': 'h.fischer@email.com' } },
    { 'id': 'INV-1294', 'date': 'Jan 8, 2024', 'status': 'Refunded', 'customer': { 'initial': 'R', 'name': 'Raj Patel', 'email': 'raj.patel@email.com' } },
    { 'id': 'INV-1293', 'date': 'Jan 7, 2024', 'status': 'Paid', 'customer': { 'initial': 'C', 'name': 'Chloe Nguyen', 'email': 'chloe.ng@email.com' } },
    { 'id': 'INV-1292', 'date': 'Jan 6, 2024', 'status': 'Cancelled', 'customer': { 'initial': 'T', 'name': 'Tobias Keller', 'email': 'tobias.k@email.com' } },
    { 'id': 'INV-1291', 'date': 'Jan 5, 2024', 'status': 'Refunded', 'customer': { 'initial': 'N', 'name': 'Nadia Kowalski', 'email': 'nadia.kw@email.com' } },
    { 'id': 'INV-1290', 'date': 'Jan 4, 2024', 'status': 'Paid', 'customer': { 'initial': 'J', 'name': 'James Okafor', 'email': 'james.o@email.com' } },
    { 'id': 'INV-1289', 'date': 'Jan 3, 2024', 'status': 'Paid', 'customer': { 'initial': 'I', 'name': 'Isla Murray', 'email': 'isla.m@email.com' } },
    { 'id': 'INV-1288', 'date': 'Jan 2, 2024', 'status': 'Cancelled', 'customer': { 'initial': 'F', 'name': 'Felix Andersen', 'email': 'felix.a@email.com' } },
    { 'id': 'INV-1287', 'date': 'Jan 1, 2024', 'status': 'Refunded', 'customer': { 'initial': 'L', 'name': 'Luna Park', 'email': 'luna.park@email.com' } },
    { 'id': 'INV-1286', 'date': 'Dec 31, 2023', 'status': 'Paid', 'customer': { 'initial': 'O', 'name': 'Oscar Rivera', 'email': 'oscar.r@email.com' } },
    { 'id': 'INV-1285', 'date': 'Dec 30, 2023', 'status': 'Refunded', 'customer': { 'initial': 'A', 'name': 'Amara Osei', 'email': 'amara.osei@email.com' } },
    { 'id': 'INV-1284', 'date': 'Dec 29, 2023', 'status': 'Paid', 'customer': { 'initial': 'V', 'name': 'Viktor Holm', 'email': 'viktor.h@email.com' } },
    { 'id': 'INV-1283', 'date': 'Dec 28, 2023', 'status': 'Cancelled', 'customer': { 'initial': 'M', 'name': 'Mia Tanaka', 'email': 'mia.t@email.com' } },
    { 'id': 'INV-1282', 'date': 'Dec 27, 2023', 'status': 'Paid', 'customer': { 'initial': 'K', 'name': 'Kwame Asante', 'email': 'kwame.a@email.com' } },
    { 'id': 'INV-1281', 'date': 'Dec 26, 2023', 'status': 'Refunded', 'customer': { 'initial': 'S', 'name': 'Sofia Petrov', 'email': 'sofia.p@email.com' } },
    { 'id': 'INV-1280', 'date': 'Dec 25, 2023', 'status': 'Cancelled', 'customer': { 'initial': 'B', 'name': 'Benjamin Cruz', 'email': 'ben.cruz@email.com' } },
    { 'id': 'INV-1279', 'date': 'Dec 24, 2023', 'status': 'Paid', 'customer': { 'initial': 'E', 'name': 'Elena Vasquez', 'email': 'elena.v@email.com' } },
    { 'id': 'INV-1278', 'date': 'Dec 23, 2023', 'status': 'Paid', 'customer': { 'initial': 'L', 'name': 'Liam Chen', 'email': 'liam.chen@email.com' } },
    { 'id': 'INV-1277', 'date': 'Dec 22, 2023', 'status': 'Refunded', 'customer': { 'initial': 'R', 'name': 'Raj Patel', 'email': 'raj.patel@email.com' } },
    { 'id': 'INV-1276', 'date': 'Dec 21, 2023', 'status': 'Cancelled', 'customer': { 'initial': 'H', 'name': 'Hannah Fischer', 'email': 'h.fischer@email.com' } },
    { 'id': 'INV-1275', 'date': 'Dec 20, 2023', 'status': 'Paid', 'customer': { 'initial': 'D', 'name': 'Daniel Okoro', 'email': 'dan.okoro@email.com' } },
    { 'id': 'INV-1274', 'date': 'Dec 19, 2023', 'status': 'Refunded', 'customer': { 'initial': 'C', 'name': 'Chloe Nguyen', 'email': 'chloe.ng@email.com' } },
    { 'id': 'INV-1273', 'date': 'Dec 18, 2023', 'status': 'Paid', 'customer': { 'initial': 'T', 'name': 'Tobias Keller', 'email': 'tobias.k@email.com' } },
    { 'id': 'INV-1272', 'date': 'Dec 17, 2023', 'status': 'Cancelled', 'customer': { 'initial': 'N', 'name': 'Nadia Kowalski', 'email': 'nadia.kw@email.com' } },
    { 'id': 'INV-1271', 'date': 'Dec 16, 2023', 'status': 'Paid', 'customer': { 'initial': 'J', 'name': 'James Okafor', 'email': 'james.o@email.com' } },
    { 'id': 'INV-1270', 'date': 'Dec 15, 2023', 'status': 'Refunded', 'customer': { 'initial': 'I', 'name': 'Isla Murray', 'email': 'isla.m@email.com' } },
    { 'id': 'INV-1269', 'date': 'Dec 14, 2023', 'status': 'Paid', 'customer': { 'initial': 'M', 'name': 'Marcus Webb', 'email': 'marcus.w@email.com' } },
    { 'id': 'INV-1268', 'date': 'Dec 13, 2023', 'status': 'Cancelled', 'customer': { 'initial': 'F', 'name': 'Felix Andersen', 'email': 'felix.a@email.com' } },
    { 'id': 'INV-1267', 'date': 'Dec 12, 2023', 'status': 'Paid', 'customer': { 'initial': 'L', 'name': 'Luna Park', 'email': 'luna.park@email.com' } },
    { 'id': 'INV-1266', 'date': 'Dec 11, 2023', 'status': 'Refunded', 'customer': { 'initial': 'O', 'name': 'Oscar Rivera', 'email': 'oscar.r@email.com' } },
    { 'id': 'INV-1265', 'date': 'Dec 10, 2023', 'status': 'Paid', 'customer': { 'initial': 'V', 'name': 'Viktor Holm', 'email': 'viktor.h@email.com' } },
    { 'id': 'INV-1264', 'date': 'Dec 9, 2023', 'status': 'Cancelled', 'customer': { 'initial': 'K', 'name': 'Kwame Asante', 'email': 'kwame.a@email.com' } },
    { 'id': 'INV-1263', 'date': 'Dec 8, 2023', 'status': 'Paid', 'customer': { 'initial': 'M', 'name': 'Mia Tanaka', 'email': 'mia.t@email.com' } },
    { 'id': 'INV-1262', 'date': 'Dec 7, 2023', 'status': 'Refunded', 'customer': { 'initial': 'B', 'name': 'Benjamin Cruz', 'email': 'ben.cruz@email.com' } },
];

export default function TablePage() {
    const navigate = useNavigate();

    const {
        pageable,
        ...restPagination
    } = usePagination<typeof orders[0]>({ paginationKey: 'orders' });

    const {data: result, isFetching: loading, error} = useQuery({
        queryKey: ['orders', ...serializePageable(pageable)],
        queryFn: () => mockFetchPageable(orders, pageable),
        enabled: pageable !== undefined,
    });

    const [showDataTable, setShowDataTable] = useState(true);

    return (
        <Body
            title={(
                <Stack
                    direction="row"
                    gap={1}
                    alignItems="center"
                    flex="1 1 auto"
                >
                    <Box flexGrow={1}>
                        <PageTitle title="Table" />
                    </Box>
                    <Switch
                        label="Data Table"
                        SwitchProps={{
                            checked: showDataTable,
                            onChange: setShowDataTable,
                            color: "success"
                        }}
                        FormControlProps={{ fullWidth: false }}
                    />
                </Stack>
            )}
            top={
                <Breadcrumbs
                    onHomeClick={() => navigate('/')}
                    items={[
                        { label: 'Display' },
                    ]}
                />
            }
        >
            {showDataTable && (
                <Card>
                    <DataTable
                        page={result}
                        loading={loading}
                        error={error}
                        headers={[
                            { label: 'Invoice', width: 120, sortKey: 'id' },
                            { label: 'Date', width: 140 },
                            { label: 'Status', width: 140 },
                            { label: 'Customer', width: 240 },
                        ]}
                        renderTableRows={renderTableRows}
                        renderListRows={renderListRows}
                        pageable={pageable}
                        {...restPagination}
                    />
                </Card>
            )}
            {!showDataTable && (
                <Card>
                    <PlainTable
                        items={result?.content}
                        loading={loading}
                        error={error}
                        headers={
                            [
                                { label: 'Invoice', width: 120 },
                                { label: 'Date', width: 140 },
                                { label: 'Status', width: 140 },
                                { label: 'Customer', width: 240 },
                            ]
                        }
                        renderTableRows={renderTableRows}
                        renderListRows={renderListRows}
                    />
                </Card>
            )}
        </Body>
    );
}

function renderTableRows(item: typeof orders[0]) {
    return (
        <TableRow key={item.id}>
            <TableCell>
                <code>{item.id}</code>

            </TableCell>
            <TableCell>
                <Typography variant="body2">{item.date}</Typography>
            </TableCell>
            <TableCell>
                <Chip
                    size="small"
                    icon={
                        {
                            Paid: <CheckRoundedIcon/>,
                            Refunded: <AutorenewRoundedIcon/>,
                            Cancelled: <BlockIcon/>,
                        }[item.status]
                    }
                    color={
                        {
                            Paid: 'success',
                            Refunded: 'warning',
                            Cancelled: 'error',
                        }[item.status] as ChipProps['color']
                    }
                    label={item.status}
                />
            </TableCell>
            <TableCell>
                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {item.customer.initial}
                    </Avatar>
                    <div>
                        <Typography variant="body2">{item.customer.name}</Typography>
                        <Typography variant="body2">{item.customer.email}</Typography>
                    </div>
                </Box>
            </TableCell>
        </TableRow>
    )
}

function renderListRows(item: typeof orders[0]) {
    return (
        <Fragment key={item.id}>
            <ListItem
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                }}
            >
                <ListItemAvatar sx={{ pt: 1 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {item.customer.initial}
                    </Avatar>
                </ListItemAvatar>

                <ListItemText>
                    <Typography fontWeight={600} gutterBottom>
                        {item.customer.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {item.customer.email}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 0.5,
                            mb: 1,
                        }}
                    >
                        <Typography variant="body2">{item.date}</Typography>
                        <Typography variant="body2">&bull;</Typography>
                        <Typography variant="body2">{item.id}</Typography>
                    </Box>

                    <Chip
                        size="small"
                        icon={
                            {
                                Paid: <CheckRoundedIcon/>,
                                Refunded: <AutorenewRoundedIcon/>,
                                Cancelled: <BlockIcon/>,
                            }[item.status]
                        }
                        color={
                            {
                                Paid: 'success',
                                Refunded: 'warning',
                                Cancelled: 'error',
                            }[item.status] as ChipProps['color']
                        }
                        label={item.status}
                    />
                </ListItemText>
            </ListItem>
            <Divider />
        </Fragment>
    )
}