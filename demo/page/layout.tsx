import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button} from '@mui/joy';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import {Body, Breadcrumbs, createPageTitleProvider, Sidebar, Title} from '../../src';
import {Logo} from '../logo';

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
                        title="Order"
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
            />
        </Box>
    );
}