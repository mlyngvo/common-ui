import React from 'react';
import {useNavigate} from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
import {Sidebar} from '../../src';
import {Logo} from '../logo';

export function DemoLayout() {
    const navigate = useNavigate();

    return (
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
    );
}