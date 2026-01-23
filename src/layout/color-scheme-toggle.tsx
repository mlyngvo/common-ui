import React, {useEffect, useState} from 'react';
import {IconButton, IconButtonProps} from '@mui/material';
import {useColorScheme} from '@mui/material/styles';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

export function ColorSchemeToggle(properties: IconButtonProps) {
    const {
        onClick,
        sx,
        ...other
    } = properties;
    const {mode, setMode} = useColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <IconButton
                size="small"
                color="inherit"
                {...other}
                sx={sx}
                disabled
            />
        );
    }
    return (
        <IconButton
            id="toggle-mode"
            size="small"
            color="inherit"
            {...other}
            onClick={(event) => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
                onClick?.(event);
            }}
            sx={[
                {
                    borderRadius: '5px',
                    border: `1px solid ${mode === 'dark' ? '#333' : '#ccc'}`,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {mode === 'light' && <DarkModeRoundedIcon color="inherit" />}
            {mode === 'dark' && <LightModeIcon color="inherit" />}
        </IconButton>
    );
}