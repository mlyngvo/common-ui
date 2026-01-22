import React from 'react';
import {Tab, tabClasses, Tabs as MuiTabs} from '@mui/material';

interface TabsProperties {
    value: number;
    onChange: (value: number) => void;
    items: string[];
    expandMx?: { xs?: number; sm?: number; md?: number; lg?: number };
}

export function Tabs({value, onChange, items, expandMx}: TabsProperties) {
    return (
        <MuiTabs
            value={value}
            onChange={(_, v) => { onChange(v as number); }}
            sx={{
                bgcolor: 'transparent',
                justifyContent: 'left',
                minHeight: '35px',
                [`&& .${tabClasses.root}`]: {
                    fontWeight: '600',
                    flex: 'initial',
                    color: 'text.tertiary',
                    [`&.${tabClasses.selected}`]: {
                        bgcolor: 'transparent',
                        color: 'text.primary',
                        '&::after': {
                            height: '2px',
                            bgcolor: 'primary.500',
                        },
                    },
                },
            }}
        >
            {items.map((item, index) => (
                <Tab
                    key={`tab-${index}`}
                    sx={{ borderRadius: '6px 6px 0 0', textTransform: 'none', p: 1, minHeight: '35px' }}
                    value={index}
                    label={item}
                />
            ))}
        </MuiTabs>
    );
}