import React, {type ReactElement} from 'react';
import {Tab, tabClasses, TabList, Tabs as MuiTabs} from '@mui/joy';

interface TabsProperties {
    value: number;
    onChange: (value: number) => void;
    items: ReactElement[];
    expandMx?: { xs?: number; sm?: number; md?: number; lg?: number };
}

export function Tabs({value, onChange, items, expandMx}: TabsProperties) {
    return (
        <MuiTabs
            defaultValue={value}
            onChange={(_, v) => { onChange(v as number); }}
            sx={{
                bgcolor: 'transparent',
                mx: expandMx,
            }}
        >
            <TabList
                tabFlex={1}
                size="sm"
                sx={{
                    pl: { xs: 0, md: 4 },
                    justifyContent: 'left',
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
                    <Tab key={`tab-${index}`} sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={index}>
                        {item}
                    </Tab>
                ))}
            </TabList>
        </MuiTabs>
    );
}