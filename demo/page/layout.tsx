import React, {type SVGProps} from 'react';
import {useNavigate} from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
import {Sidebar} from '../../src';

export function DemoLayout() {
    const navigate = useNavigate();

    return (
        <Sidebar
            title="Common UI"
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

function Logo(properties: SVGProps<any>) {
    return (
        <svg
            viewBox="0 0 124 119"
            style={{
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                strokeLinejoin: 'round',
                strokeMiterlimit: 2
            }}
            {...properties}
        >
            <path
                d="M1056.76 334.276c-7.99-8.548-19.33-12.882-33.69-12.882h-6.85c1.24 4.317 1.86 9.36 1.86 15.196 0 .568-.01 1.122-.02 1.675h5.01c9.64 0 16.62 2.463 21.36 7.53 4.82 5.159 7.27 13.646 7.27 25.224 0 11.478-2.44 19.87-7.24 24.944-4.73 5.01-11.73 7.445-21.39 7.445h-11.18c-9.65 0-16.65-2.435-21.387-7.446-4.712-4.979-7.136-13.167-7.224-24.327h-7.415c-3.426 0-6.578-.33-9.458-.975-.001.121-.006.238-.006.359 0 15.936 3.986 28.229 11.845 36.535 7.983 8.444 19.304 12.725 33.645 12.725h11.18c14.35 0 25.67-4.281 33.65-12.724 7.86-8.311 11.85-20.603 11.85-36.536 0-15.994-3.98-28.356-11.81-36.743Z"
                style={{ fill: 'url(#a)' }}
                transform="translate(-944.7109 -301.42363)"
            />
            <path
                d="M1018.06 338.262c-.23 10.739-2.67 18.668-7.44 24.193-5.27 6.091-13.196 9.178-23.58 9.178h-3.762c0-.203-.008-.405-.008-.616 0-6.369.742-11.793 2.209-16.255 1.207-3.644 2.885-6.648 5.062-8.967 2.741-2.935 6.251-4.994 10.589-6.208 3.14-.878 6.71-1.325 10.76-1.325h6.17Z"
                style={{ fill: 'url(#b)' }} transform="translate(-944.7109 -301.42363)"
            />
            <path
                d="M1016.22 321.391h-4.33c-4.74 0-9.14.49-13.217 1.426-8.259 1.906-15.109 5.736-20.465 11.455-4.716 5.053-8.022 11.548-9.911 19.402-1.233 5.095-1.865 10.763-1.89 16.989-5.989-1.342-10.781-4.066-14.306-8.149-4.978-5.77-7.39-14.205-7.39-25.804 0-11.658 2.43-20.169 7.432-26.015 5.263-6.149 13.243-9.271 23.72-9.271h11.177c10.494 0 18.46 3.13 23.7 9.305 2.44 2.893 4.26 6.427 5.48 10.662Z"
                style={{ fill: 'url(#b)' }} transform="translate(-944.7109 -301.42363)"
            />
            <defs>
                <linearGradient id="a" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="rotate(45 80.41228151 1366.87344848) scale(106.2685)">
                    <stop offset="0" style={{ stopColor: '#211dca', stopOpacity: 1 }} />
                    <stop offset="1" style={{ stopColor: '#6462da', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="b" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse"
                                gradientTransform="matrix(36.3494 42.8737 -42.8737 36.3494 964.692 312.514)">
                    <stop offset="0" style={{ stopColor: '#93d8dd', stopOpacity: 1 }} />
                    <stop offset="1" style={{ stopColor: '#64c8cf', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="c" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse"
                                gradientTransform="matrix(36.3494 42.8737 -42.8737 36.3494 962.531 314.346)">
                    <stop offset="0" style={{ stopColor: '#93d8dd', stopOpacity: 1 }} />
                    <stop offset="1" style={{ stopColor: '#64c8cf', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
        </svg>
    );
}