import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Chip,
    type ColorPaletteProp, Divider,
    Dropdown, FormControl, FormLabel,
    IconButton,
    Link, List, ListDivider, ListItem, ListItemContent, ListItemDecorator, Menu,
    MenuButton, MenuItem, Select,
    Typography, Option,
} from '@mui/joy';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import BlockIcon from '@mui/icons-material/Block';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {Logo} from '../logo';
import {Body, Breadcrumbs, createPageTitleProvider, Sidebar, DataTable, Title, usePagination, Pageable} from '../../src';

const {
    PageTitleProvider,
    usePageTitle
} = createPageTitleProvider('Common UI');

export function DemoLayout() {
    return (
        <PageTitleProvider>
            <Layout />
        </PageTitleProvider>
    );
}

function Layout() {
    const navigate = useNavigate();
    const {setTitle} = usePageTitle();

    useEffect(() => {
        setTitle('The Layout');
    }, [setTitle]);

    return (
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Sidebar
                appTitle="Common UI"
                logo={<Logo />}
                navItems={[
                    { title: 'Home', onClick: () => { navigate('/'); }, icon: <HomeRoundedIcon /> },
                    { title: 'Dashboard', icon: <DashboardRoundedIcon /> },
                    { title: 'Orders', icon: <ShoppingCartRoundedIcon /> },
                    { title: 'Tasks', icon: <TaskRoundedIcon />, selected: true,
                        children: [
                            { title: 'All tasks' },
                            { title: 'Backlog' },
                            { title: 'In progress' },
                            { title: 'Done' },
                        ]
                    },
                ]}
                profile={{
                    displayLine: 'John D.',
                    secondaryLine: 'Project Manager',
                    profileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286',
                    onLogout: () => {}
                }}
            />
            <Body
                top={(
                    <Breadcrumbs
                        onHomeClick={() => { navigate('/'); }}
                        items={[
                            { label: 'Dashboard', onClick: () => { navigate('/layout'); } },
                            { label: 'Orders' }
                        ]}
                    />
                )}
                title={(
                    <Title
                        title="Orders"
                        actions={(
                            <Button
                                color="primary"
                                startDecorator={<DownloadRoundedIcon />}
                                size="sm"
                            >
                                Download PDF
                            </Button>
                        )}
                    />
                )}
            >
                <DemoTable />
            </Body>
        </Box>
    );
}

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

interface Order {
    id: string;
    date: string;
    status: string;
    customer: {
        initial: string;
        name: string;
        email: string;
    }
}

const fetch = async (pageable: Pageable<Order>) => {
    const total = 23;
    return {
        content: orders,
        size: pageable.size,
        isLast: pageable.page === total,
        number: pageable.page,
        totalElements: 50,
        totalPages: total
    };
};

function DemoTable() {

    // const handleNeedle = debounce((needle: string) => {
    //     console.info('needle changed', needle)
    // }, 300)

    return (
        <DataTable
            {...usePagination<Order>({
                paginationKey: 'page-order',
                fetch,
            })}
            headers={
                [
                    { sortKey: ['id'], label: 'Invoice', width: 120 },
                    { sortKey: ['date'], label: 'Date', width: 140 },
                    { sortKey: ['status'], label: 'Status', width: 140 },
                    { sortKey: ['id', 'customer'], label: 'Customer', width: 240 },
                    { label: '', width: 140 },
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
                    <td>
                        <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link level="body-xs" component="button">
                                Download
                            </Link>
                            <RowMenu/>
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
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <Link level="body-sm" component="button">
                                        Download
                                    </Link>
                                    <RowMenu />
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
            renderFilter={() => (
                <>
                    <FormControl size="sm">
                        <FormLabel>Status</FormLabel>
                        <Select
                            size="sm"
                            placeholder="Filter by status"
                            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                        >
                            <Option value="paid">Paid</Option>
                            <Option value="pending">Pending</Option>
                            <Option value="refunded">Refunded</Option>
                            <Option value="cancelled">Cancelled</Option>
                        </Select>
                    </FormControl>
                    <FormControl size="sm">
                        <FormLabel>Category</FormLabel>
                        <Select size="sm" placeholder="All">
                            <Option value="all">All</Option>
                            <Option value="refund">Refund</Option>
                            <Option value="purchase">Purchase</Option>
                            <Option value="debit">Debit</Option>
                        </Select>
                    </FormControl>
                    <FormControl size="sm">
                        <FormLabel>Customer</FormLabel>
                        <Select size="sm" placeholder="All">
                            <Option value="all">All</Option>
                            <Option value="olivia">Olivia Rhye</Option>
                            <Option value="steve">Steve Hampton</Option>
                            <Option value="ciaran">Ciaran Murray</Option>
                            <Option value="marina">Marina Macdonald</Option>
                            <Option value="charles">Charles Fulton</Option>
                            <Option value="jay">Jay Hoper</Option>
                        </Select>
                    </FormControl>
                </>
            )}
        />
    );
}

function RowMenu() {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Rename</MenuItem>
                <MenuItem>Move</MenuItem>
                <Divider />
                <MenuItem color="danger">Delete</MenuItem>
            </Menu>
        </Dropdown>
    );
}