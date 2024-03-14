import React from 'react';
import {Breadcrumbs as MuiBreadcrumbs, Link, Typography, useTheme} from '@mui/joy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

interface BreadcrumbsProperties {
    onHomeClick: () => void;
    items: Array<{ label: string, onClick?: () => void }>
}

export function Breadcrumbs({onHomeClick, items}: BreadcrumbsProperties) {
    const theme = useTheme();

    return (
        <MuiBreadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon sx={{ fontSize: theme.typography['body-xs'].fontSize }} />}
            sx={{ pl: 0 }}
        >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
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