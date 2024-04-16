import React from 'react';
import {
    Avatar,
    Box,
    Chip,
    type ColorPaletteProp,
    Container,
    List, ListDivider,
    ListItem,
    ListItemContent, ListItemDecorator,
    Typography
} from '@mui/joy';
import {useAsync} from 'react-async-hook';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import BlockIcon from '@mui/icons-material/Block';
import {fetchOrders} from '../data';
import {PlainTable} from '../../src';

export function DemoTable() {
    const {result, loading, error} = useAsync(async () => await fetchOrders({ page: 0, size: 999 }), []);

    return (
        <Container>
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
                    <tr key={item.id}>
                        <td>
                            <Typography level="body-xs">
                                {item.id}
                            </Typography>

                        </td>
                        <td>
                            <Typography level="body-xs">{item.date}</Typography>
                        </td>
                        <td>
                            <Chip
                                variant="soft"
                                size="sm"
                                startDecorator={
                                    {
                                        Paid: <CheckRoundedIcon/>,
                                        Refunded: <AutorenewRoundedIcon/>,
                                        Cancelled: <BlockIcon/>,
                                    }[item.status]
                                }
                                color={
                                    {
                                        Paid: 'success',
                                        Refunded: 'neutral',
                                        Cancelled: 'danger',
                                    }[item.status] as ColorPaletteProp
                                }
                            >
                                {item.status}
                            </Chip>
                        </td>
                        <td>
                            <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                                <Avatar size="sm">{item.customer.initial}</Avatar>
                                <div>
                                    <Typography level="body-xs">{item.customer.name}</Typography>
                                    <Typography level="body-xs">{item.customer.email}</Typography>
                                </div>
                            </Box>
                        </td>
                    </tr>
                )}
                renderListRow={item => (
                    <List
                        key={item.id}
                        size="sm"
                        sx={{
                            '--ListItem-paddingX': 0,
                        }}
                    >
                        <ListItem
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'start',
                            }}
                        >
                            <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                                <ListItemDecorator>
                                    <Avatar size="sm">{item.customer.initial}</Avatar>
                                </ListItemDecorator>
                                <div>
                                    <Typography fontWeight={600} gutterBottom>
                                        {item.customer.name}
                                    </Typography>
                                    <Typography level="body-xs" gutterBottom>
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
                                        <Typography level="body-xs">{item.date}</Typography>
                                        <Typography level="body-xs">&bull;</Typography>
                                        <Typography level="body-xs">{item.id}</Typography>
                                    </Box>
                                </div>
                            </ListItemContent>
                            <Chip
                                variant="soft"
                                size="sm"
                                startDecorator={
                                    {
                                        Paid: <CheckRoundedIcon />,
                                        Refunded: <AutorenewRoundedIcon />,
                                        Cancelled: <BlockIcon />,
                                    }[item.status]
                                }
                                color={
                                    {
                                        Paid: 'success',
                                        Refunded: 'neutral',
                                        Cancelled: 'danger',
                                    }[item.status] as ColorPaletteProp
                                }
                            >
                                {item.status}
                            </Chip>
                        </ListItem>
                        <ListDivider />
                    </List>
                )}
            />
        </Container>
    );
}