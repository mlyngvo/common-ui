import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {type PropsWithChildren, type ReactElement} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';

import {AppTheme} from '../src';
import {PageTitleProvider} from './context';
import Display from "./page/display";
import Form from "./page/form";
import Index from './page/index';
import Layout from './page/layout';

const queryClient = new QueryClient();

const routes: Record<string, { title: string, element: ReactElement }> = {
    '/': { title: 'Index', element: <Index /> },
    '/layout': { title: 'Layout', element: <Layout /> },
    '/form': { title: 'Form', element: <Form /> },
    '/display': { title: 'Display', element: <Display /> },
};

function Shell({children}: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            <AppTheme>
                {children}
            </AppTheme>
        </QueryClientProvider>
    );
}

export function Demo() {
    return (
        <HashRouter>
            <Shell>
                <PageTitleProvider>
                    <Routes>
                        {Object.entries(routes).map(([path, { element }]) => (
                            <Route key={path} {...{path, element}} />
                        ))}
                    </Routes>
                </PageTitleProvider>
            </Shell>
        </HashRouter>
    );
}