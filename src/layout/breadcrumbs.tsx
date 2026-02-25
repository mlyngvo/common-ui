import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import {Breadcrumbs as MuiBreadcrumbs, Link, Typography,useTheme} from '@mui/material';
import React from 'react';

interface BreadcrumbsProperties {
    onHomeClick: () => void;
    items: Array<{ label: string, onClick?: () => void }>
}

export function Breadcrumbs({onHomeClick, items}: BreadcrumbsProperties) {
    const theme = useTheme();

    return (
        <MuiBreadcrumbs
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon sx={{ fontSize: theme.typography.body2.fontSize }} />}
            sx={{ pl: 0 }}
        >
            { }
            <Link
                component="button"
                underline="none"
                color="neutral"
                onClick={() => { onHomeClick(); }}
            >
                <HomeRoundedIcon />
            </Link>
            {items.map(({label, onClick}) => onClick === undefined
                ? <Typography key={label} color="primary" fontWeight={500} fontSize={12}>{label}</Typography>
                : (
                     
                    <Link
                        key={label}
                        component="button"
                        underline="hover"
                        color="neutral"
                        fontSize={12}
                        fontWeight={500}
                        onClick={() => { onClick(); }}
                    >
                        {label}
                    </Link>
                )
            )}
        </MuiBreadcrumbs>
    );
}