import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, {type ReactElement, ReactNode, useState} from 'react';

import {ColorSchemeToggle} from './color-scheme-toggle';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

interface SidebarNavItem {
    title: string;
    icon: ReactElement;
    onClick?: () => void;
    selected?: boolean;
    children?: Array<Omit<SidebarNavItem, 'icon'>>;
}

interface SidebarProfile {
    displayLine: string;
    secondaryLine?: string;
    profileImageUrl?: string;
    onLogout?: () => void;
}

interface SideNavProps {
    appTitle: string;
    logo: ReactNode;
    navItems: SidebarNavItem[];
    bottomNavItems?: SidebarNavItem[];
    profile?: SidebarProfile;
}

export function SideNav({appTitle, logo, navItems, bottomNavItems, profile}: SideNavProps) {
    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', md: 'block' },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: 'background.paper',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                    p: 1.5,
                }}
            >
                <Stack
                    width="100%"
                    direction="row"
                    gap={1}
                    alignItems="center"
                >
                    <IconButton color="inherit" size="small" sx={{ width: 35, height: 35, p: 0.45 }}>
                        {logo}
                    </IconButton>
                    <Typography variant="subtitle2" lineHeight="1em" flexGrow={1}><strong>{appTitle}</strong></Typography>
                    <ColorSchemeToggle sx={{ ml: 'auto' }} />
                </Stack>
            </Box>
            <Divider />
            <Box
                sx={{
                    overflow: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'stretch',
                }}
            >
                <List disablePadding>
                    {navItems.map(item => <NavItem key={item.title} item={item} />)}
                </List>
                {/* <CardAlert /> */}
            </Box>
            {bottomNavItems !== undefined && (
                <List disablePadding>
                    {bottomNavItems.map(item => <NavItem key={item.title} item={item} />)}
                </List>
            )}
            {profile !== undefined && (
                <Stack
                    direction="row"
                    sx={{
                        p: 2,
                        gap: 1,
                        alignItems: 'center',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Avatar
                        sizes="small"
                        alt={profile.displayLine}
                        src={profile.profileImageUrl}
                        sx={{ width: 36, height: 36 }}
                    />
                    <Box sx={{ mr: 'auto' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                            {profile.displayLine}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {profile.secondaryLine}
                        </Typography>
                    </Box>
                    {profile.onLogout !== undefined && (
                        <IconButton onClick={profile.onLogout}>
                            <LogoutRoundedIcon />
                        </IconButton>
                    )}
                </Stack>
            )}
        </Drawer>
    );
}

function NavItem({item: {title: itemTitle, icon, onClick, selected, children}}: { item: SidebarNavItem }) {

    function renderItemButton(handler?: () => void, dropDown?: boolean) {
        return (
            <ListItemButton
                onClick={handler}
                selected={selected}
                sx={{
                    borderRadius: '6px',
                }}
            >
                <ListItemIcon
                    sx={{
                        mr: 1,
                        minWidth: 'unset',
                        '& > svg': {
                            fontSize: 'inherit',
                        }
                    }}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText>
                    <Typography variant="body2">{itemTitle}</Typography>
                </ListItemText>
                {dropDown !== undefined && (
                    <KeyboardArrowDownIcon
                        sx={{ transform: dropDown ? 'rotate(180deg)' : 'none' }}
                    />
                )}
            </ListItemButton>
        );
    }

    return (
        <ListItem
            disablePadding
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                py: 0.5,
                px: 1
            }}
        >
            {children === undefined && (
                renderItemButton(onClick)
            )}
            {children !== undefined && (
                <Toggler
                    renderToggle={({ open, setOpen }) => (
                        renderItemButton(() => { setOpen(!open); }, open)
                    )}
                    defaultExpanded={selected}
                >
                    <List sx={{ gap: 0.5 }} disablePadding>
                        {children.map(c => (
                            <ListItem key={c.title} sx={{ mt: 0.5, pl: 3 }} disablePadding>
                                <ListItemButton onClick={c.onClick} sx={{ borderRadius: '6px', }}>{c.title}</ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Toggler>
            )}
        </ListItem>
    );
}

interface TogglerProperties {
    children: ReactNode;
    renderToggle: (parameters: {
        open: boolean;
        setOpen: (value: boolean) => void;
    }) => ReactNode;
    defaultExpanded: boolean|undefined;
}

function Toggler({renderToggle, children, defaultExpanded = false}: TogglerProperties) {
    const [open, setOpen] = useState(defaultExpanded);
    return (
        <>
            {renderToggle({ open, setOpen })}
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateRows: open ? '1fr' : '0fr',
                    transition: '0.2s ease',
                    '& > *': {
                        overflow: 'hidden',
                    },
                }}
            >
                {children}
            </Box>
        </>
    );
}