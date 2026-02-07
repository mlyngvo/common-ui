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
    ListItemText, TableCell, TableRow,
    Typography
} from "@mui/material";
import {useQuery} from '@tanstack/react-query';
import React, {Fragment} from 'react';
import {useNavigate} from "react-router-dom";

import {Body, Breadcrumbs, PageTitle, PlainTable} from '../../src';
import {mockFetchPageable} from "../utils";

export default function TablePage() {
    const navigate = useNavigate();

    const orders = [
        {
            'id': 'INV-1234',
            'date': 'Feb 3, 2023',
            'status': 'Refunded',
            'customer': {
                'initial': 'O',
                'name': 'Olivia Ryhe',
                'email': 'olivia@email.com'
            }
        },
        {
            'id': 'INV-1233',
            'date': 'Feb 3, 2023',
            'status': 'Paid',
            'customer': {
                'initial': 'S',
                'name': 'Steve Hampton',
                'email': 'steve.hamp@email.com'
            }
        },
        {
            'id': 'INV-1232',
            'date': 'Feb 3, 2023',
            'status': 'Refunded',
            'customer': {
                'initial': 'C',
                'name': 'Ciaran Murray',
                'email': 'ciaran.murray@email.com'
            }
        },
        {
            'id': 'INV-1231',
            'date': 'Feb 3, 2023',
            'status': 'Refunded',
            'customer': {
                'initial': 'M',
                'name': 'Maria Macdonald',
                'email': 'maria.mc@email.com'
            }
        },
        {
            'id': 'INV-1230',
            'date': 'Feb 3, 2023',
            'status': 'Cancelled',
            'customer': {
                'initial': 'C',
                'name': 'Charles Fulton',
                'email': 'fulton@email.com'
            }
        },
        {
            'id': 'INV-1229',
            'date': 'Feb 3, 2023',
            'status': 'Cancelled',
            'customer': {
                'initial': 'J',
                'name': 'Jay Hooper',
                'email': 'hooper@email.com'
            }
        },
        {
            'id': 'INV-1228',
            'date': 'Feb 3, 2023',
            'status': 'Refunded',
            'customer': {
                'initial': 'K',
                'name': 'Krystal Stevens',
                'email': 'k.stevens@email.com'
            }
        },
        {
            'id': 'INV-1227',
            'date': 'Feb 3, 2023',
            'status': 'Paid',
            'customer': {
                'initial': 'S',
                'name': 'Sachin Flynn',
                'email': 's.flyn@email.com'
            }
        },
        {
            'id': 'INV-1226',
            'date': 'Feb 3, 2023',
            'status': 'Cancelled',
            'customer': {
                'initial': 'B',
                'name': 'Bradley Rosales',
                'email': 'brad123@email.com'
            }
        },
        {
            'id': 'INV-1225',
            'date': 'Feb 3, 2023',
            'status': 'Paid',
            'customer': {
                'initial': 'O',
                'name': 'Olivia Ryhe',
                'email': 'olivia@email.com'
            }
        },
        {
            'id': 'INV-1224',
            'date': 'Feb 3, 2023',
            'status': 'Cancelled',
            'customer': {
                'initial': 'S',
                'name': 'Steve Hampton',
                'email': 'steve.hamp@email.com'
            }
        },
        {
            'id': 'INV-1223',
            'date': 'Feb 3, 2023',
            'status': 'Paid',
            'customer': {
                'initial': 'C',
                'name': 'Ciaran Murray',
                'email': 'ciaran.murray@email.com'
            }
        },
        {
            'id': 'INV-1221',
            'date': 'Feb 3, 2023',
            'status': 'Refunded',
            'customer': {
                'initial': 'M',
                'name': 'Maria Macdonald',
                'email': 'maria.mc@email.com'
            }
        },
        {
            'id': 'INV-1220',
            'date': 'Feb 3, 2023',
            'status': 'Paid',
            'customer': {
                'initial': 'C',
                'name': 'Charles Fulton',
                'email': 'fulton@email.com'
            }
        },
        {
            'id': 'INV-1219',
            'date': 'Feb 3, 2023',
            'status': 'Cancelled',
            'customer': {
                'initial': 'J',
                'name': 'Jay Hooper',
                'email': 'hooper@email.com'
            }
        },
        {
            'id': 'INV-1218',
            'date': 'Feb 3, 2023',
            'status': 'Cancelled',
            'customer': {
                'initial': 'K',
                'name': 'Krystal Stevens',
                'email': 'k.stevens@email.com'
            }
        },
        {
            'id': 'INV-1217',
            'date': 'Feb 3, 2023',
            'status': 'Paid',
            'customer': {
                'initial': 'S',
                'name': 'Sachin Flynn',
                'email': 's.flyn@email.com'
            }
        },
        {
            'id': 'INV-1216',
            'date': 'Feb 3, 2023',
            'status': 'Cancelled',
            'customer': {
                'initial': 'B',
                'name': 'Bradley Rosales',
                'email': 'brad123@email.com'
            }
        }
    ];

    const {data: result, isLoading: loading, error} = useQuery({
        queryKey: ['orders'],
        queryFn: () => mockFetchPageable(orders, 0, 10),
    });

    return (
        <Body
            title={<PageTitle title="Table" />}
            top={
                <Breadcrumbs
                    onHomeClick={() => navigate('/')}
                    items={[
                        { label: 'Display' },
                    ]}
                />
            }
        >
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
                    renderTableRow={item => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Typography variant="caption">{item.id}</Typography>

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
                    )}
                    renderListRow={item => (
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
                    )}
                />
            </Card>
        </Body>
    );
}