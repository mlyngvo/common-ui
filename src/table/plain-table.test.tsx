import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {useMediaQuery} from '@mui/material';
import {render, screen} from '@testing-library/react';
import React from 'react';

import {PlainTable} from './plain-table';

jest.mock('@mui/material', () => ({
    ...jest.requireActual<typeof import('@mui/material')>('@mui/material'),
    useMediaQuery: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;

interface TestItem {
    id: number;
    name: string;
}

const testItems: TestItem[] = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item 3'},
];

const testHeaders = [
    {label: 'ID', width: 50},
    {label: 'Name', width: 200},
];

afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
});

describe('PlainTable', () => {
    describe('desktop view', () => {
        beforeEach(() => {
            mockUseMediaQuery.mockReturnValue(false);
        });

        it('renders table headers', () => {
            render(
                <PlainTable
                    items={testItems}
                    loading={false}
                    error={undefined}
                    headers={testHeaders}
                    renderTableRow={item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    )}
                    renderListRow={item => <li key={item.id}>{item.name}</li>}
                />
            );

            expect(screen.getByText('ID')).toBeInTheDocument();
            expect(screen.getByText('Name')).toBeInTheDocument();
        });

        it('renders table rows', () => {
            render(
                <PlainTable
                    items={testItems}
                    loading={false}
                    error={undefined}
                    headers={testHeaders}
                    renderTableRow={item => (
                        <tr key={item.id} data-testid={`row-${item.id}`}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    )}
                    renderListRow={item => <li key={item.id}>{item.name}</li>}
                />
            );

            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
            expect(screen.getByText('Item 3')).toBeInTheDocument();
            expect(screen.getByTestId('row-1')).toBeInTheDocument();
            expect(screen.getByTestId('row-2')).toBeInTheDocument();
            expect(screen.getByTestId('row-3')).toBeInTheDocument();
        });

        it('renders error state', () => {
            const error = new Error('Something went wrong');

            render(
                <PlainTable<TestItem>
                    items={undefined}
                    loading={false}
                    error={error}
                    headers={testHeaders}
                    renderTableRow={item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    )}
                    renderListRow={item => <li key={item.id}>{item.name}</li>}
                />
            );

            expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        });

        it('renders loading state', () => {
            render(
                <PlainTable
                    items={testItems}
                    loading={true}
                    error={undefined}
                    headers={testHeaders}
                    renderTableRow={item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    )}
                    renderListRow={item => <li key={item.id}>{item.name}</li>}
                />
            );

            expect(screen.getByRole('progressbar')).toBeInTheDocument();
        });

        it('renders empty state when items is undefined', () => {
            render(
                <PlainTable<TestItem>
                    items={undefined}
                    loading={false}
                    error={undefined}
                    headers={testHeaders}
                    renderTableRow={item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    )}
                    renderListRow={item => <li key={item.id}>{item.name}</li>}
                />
            );

            expect(screen.getByText('ID')).toBeInTheDocument();
            expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
        });
    });

    describe('mobile view', () => {
        beforeEach(() => {
            mockUseMediaQuery.mockReturnValue(true);
        });

        it('renders list rows instead of table', () => {
            render(
                <PlainTable
                    items={testItems}
                    loading={false}
                    error={undefined}
                    headers={testHeaders}
                    renderTableRow={item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    )}
                    renderListRow={item => (
                        <li key={item.id} data-testid={`list-item-${item.id}`}>
                            {item.name}
                        </li>
                    )}
                />
            );

            expect(screen.getByTestId('list-item-1')).toBeInTheDocument();
            expect(screen.getByTestId('list-item-2')).toBeInTheDocument();
            expect(screen.getByTestId('list-item-3')).toBeInTheDocument();
            expect(screen.queryByText('ID')).not.toBeInTheDocument();
        });

        it('does not render table headers on mobile', () => {
            render(
                <PlainTable
                    items={testItems}
                    loading={false}
                    error={undefined}
                    headers={testHeaders}
                    renderTableRow={item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    )}
                    renderListRow={item => <li key={item.id}>{item.name}</li>}
                />
            );

            expect(screen.queryByRole('table')).not.toBeInTheDocument();
        });
    });
});