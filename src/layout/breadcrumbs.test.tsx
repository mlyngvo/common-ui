import React from 'react';
import {afterEach, describe, expect, it} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import {Body} from './body';
import { Typography } from '@mui/material';
import {Breadcrumbs} from './breadcrumbs';

describe('breadcrumbs test', () => {
    it('can render breadcrumbs', async () => {
        render(
            <Breadcrumbs
                onHomeClick={() => {}}
                items={[
                    { label: 'Menu 1', onClick: () => {} },
                    { label: 'Menu A' },
                ]}
            />
        );

        const menu1 = screen.getByText('Menu 1');
        const menuA = screen.getByText('Menu A');
        expect(menu1).toBeVisible();
        expect(menuA).toBeVisible();
    });
});

