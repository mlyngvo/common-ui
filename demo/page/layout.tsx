import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
import {Box, Card, CardContent, Stack} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';

import {Body, Breadcrumbs, PageTitle, SideNav, Tabs} from '../../src';
import {Logo} from '../logo';

export default function LayoutPage() {
    const navigate = useNavigate();

    return (
        <Stack
            direction="row"
            gap={1}
        >
            <SideNav
                appTitle="Common UI"
                logo={<Logo />}
                navItems={[
                    { title: 'Home', onClick: () => { void navigate('/'); }, icon: <HomeRoundedIcon /> },
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
                bottomNavItems={[
                    { title: 'Users', icon: <PeopleRoundedIcon /> },
                ]}
                profile={{
                    displayLine: 'John D.',
                    secondaryLine: 'Project Manager',
                    profileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286',
                    onLogout: () => {}
                }}
            />
            <Body
                top={
                    <Breadcrumbs
                        onHomeClick={() => navigate('/')}
                        items={[
                            { label: 'Layout' }
                        ]}
                    />
                }
                title={<PageTitle title="Layout" />}
            >
                <Tabs
                    items={[
                        'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'
                    ]}
                    value={0}
                    onChange={() => {}}
                />

                <Box my={1} />

                <Card variant="outlined">
                    <CardContent />
                </Card>
            </Body>
        </Stack>
    );
}