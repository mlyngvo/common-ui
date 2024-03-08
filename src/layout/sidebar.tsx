import React, {type ReactElement, type ReactNode} from 'react';
import {
    Avatar,
    Box, Divider,
    GlobalStyles,
    IconButton,
    Input,
    List,
    ListItem,
    ListItemButton,
    listItemButtonClasses, ListItemContent,
    Sheet,
    Typography
} from '@mui/joy';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {ColorSchemeToggle} from './color-scheme-toggle';

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

interface SidebarProperties {
    title: string;
    logo: ReactElement;
    navItems: SidebarNavItem[];
    profile: SidebarProfile|undefined;
}

export function Sidebar({title, logo, navItems, profile}: SidebarProperties) {
    return (
        <Sheet
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10_000,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
                borderRadius: 0
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '250px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '280px',
                        },
                    },
                })}
            />
            <Box
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => {}}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton color="neutral" size="sm" sx={{ p: 0.75 }}>
                    {logo}
                </IconButton>
                <Typography level="title-md"><strong>{title}</strong></Typography>
                <ColorSchemeToggle sx={{ ml: 'auto' }} />
            </Box>
            <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />

            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    }}
                >
                    {navItems.map(({title: itemTitle, icon, onClick, selected, children}) => {
                        const renderItemButton = (handler?: () => void, dropDown?: boolean) => (
                            <ListItemButton onClick={handler} selected={selected}>
                                {icon}
                                <ListItemContent>
                                    <Typography level="title-sm">{itemTitle}</Typography>
                                </ListItemContent>
                                {dropDown !== undefined && (
                                    <KeyboardArrowDownIcon
                                        sx={{ transform: dropDown ? 'rotate(180deg)' : 'none' }}
                                    />
                                )}
                            </ListItemButton>
                        );

                        return (
                            <ListItem key={itemTitle} nested={children !== undefined}>
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
                                        <List sx={{ gap: 0.5 }}>
                                            {children.map(c => (
                                                <ListItem key={c.title} sx={{ mt: 0.5 }}>
                                                    <ListItemButton onClick={c.onClick}>{c.title}</ListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Toggler>
                                )}
                            </ListItem>
                        );
                    })}
                </List>

                {/* BOTTOM NAV ITEMS */}
                {/* <List */}
                {/*    size="sm" */}
                {/*    sx={{ */}
                {/*        mt: 'auto', */}
                {/*        flexGrow: 0, */}
                {/*        '--ListItem-radius': (theme) => theme.vars.radius.sm, */}
                {/*        '--List-gap': '8px', */}
                {/*        mb: 2, */}
                {/*    }} */}
                {/* > */}
                {/*    <ListItem> */}
                {/*        <ListItemButton> */}
                {/*            /!*<SupportRoundedIcon />*!/ */}
                {/*            Support */}
                {/*        </ListItemButton> */}
                {/*    </ListItem> */}
                {/*    <ListItem> */}
                {/*        <ListItemButton> */}
                {/*            /!*<SettingsRoundedIcon />*!/ */}
                {/*            Settings */}
                {/*        </ListItemButton> */}
                {/*    </ListItem> */}
                {/* </List> */}

                {profile !== undefined && (
                    <>
                        <Divider />
                        <Box sx={{ display: 'flex', mt: 2, gap: 1, alignItems: 'center' }}>
                            <Avatar
                                variant="outlined"
                                size="sm"
                                src={profile.profileImageUrl}
                            />
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Typography level="title-sm">{profile.displayLine}</Typography>
                                {profile.secondaryLine !== undefined && <Typography level="body-xs">{profile.secondaryLine}</Typography>}
                            </Box>
                            {profile.onLogout !== undefined && (
                                <IconButton size="sm" variant="plain" color="neutral" onClick={profile.onLogout}>
                                    <LogoutRoundedIcon />
                                </IconButton>
                            )}
                        </Box>
                    </>
                )}
            </Box>
        </Sheet>
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
    const [open, setOpen] = React.useState(defaultExpanded);
    return (
        <>
            {renderToggle({ open, setOpen })}
            <Box
                sx={{
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