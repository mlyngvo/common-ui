import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {useMediaQuery} from '@mui/material';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import {SpringPage, SpringPageable} from '../data/page';
import {DataTable, DataTableProperties} from './data-table';

function getButtonByIcon(testId: string): HTMLElement {
    const icon = screen.getByTestId(testId);
    return icon.closest('button') as HTMLElement;
}

jest.mock('@mui/material', () => ({
    ...jest.requireActual<typeof import('@mui/material')>('@mui/material'),
    useMediaQuery: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;

interface TestItem {
    id: number;
    name: string;
    status: string;
}

const testItems: TestItem[] = [
    {id: 1, name: 'Item 1', status: 'active'},
    {id: 2, name: 'Item 2', status: 'inactive'},
    {id: 3, name: 'Item 3', status: 'active'},
];

const testPage: SpringPage<TestItem> = {
    content: testItems,
    size: 25,
    number: 0,
    totalElements: 3,
    totalPages: 1,
    isFirst: true,
    isLast: true,
};

const testPageable: SpringPageable<TestItem> = {
    size: 25,
    page: 0,
};

const testHeaders: DataTableProperties<TestItem>['headers'] = [
    {label: 'ID', width: 50, sortKey: 'id'},
    {label: 'Name', width: 200},
    {label: 'Status', width: 100},
];

function renderTableRows(item: TestItem) {
    return (
        <tr key={item.id} data-testid={`row-${item.id}`}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.status}</td>
        </tr>
    );
}

function renderListRows(item: TestItem) {
    return (
        <li key={item.id} data-testid={`list-item-${item.id}`}>
            {item.name}
        </li>
    );
}

const defaultProps: DataTableProperties<TestItem> = {
    page: testPage,
    loading: false,
    error: undefined,
    headers: testHeaders,
    pageable: testPageable,
    renderTableRows,
    renderListRows,
    onPageNumber: jest.fn(),
    onPageSize: jest.fn(),
};

afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
});

describe('DataTable', () => {
    describe('desktop view', () => {
        beforeEach(() => {
            mockUseMediaQuery.mockReturnValue(false);
        });

        it('renders table headers', () => {
            render(<DataTable {...defaultProps} />);

            expect(screen.getByText('ID')).toBeInTheDocument();
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Status')).toBeInTheDocument();
        });

        it('renders table rows', () => {
            render(<DataTable {...defaultProps} />);

            expect(screen.getByTestId('row-1')).toBeInTheDocument();
            expect(screen.getByTestId('row-2')).toBeInTheDocument();
            expect(screen.getByTestId('row-3')).toBeInTheDocument();
            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
            expect(screen.getByText('Item 3')).toBeInTheDocument();
        });

        it('renders error state', () => {
            render(
                <DataTable
                    {...defaultProps}
                    page={undefined}
                    error={new Error('Something went wrong')}
                />
            );

            expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        });

        it('renders loading state', () => {
            render(<DataTable {...defaultProps} loading={true} />);

            expect(screen.getByRole('progressbar')).toBeInTheDocument();
        });

        it('renders empty state when page is undefined', () => {
            render(<DataTable {...defaultProps} page={undefined} />);

            expect(screen.getByText('ID')).toBeInTheDocument();
            expect(screen.queryByTestId('row-1')).not.toBeInTheDocument();
        });

        it('renders sortable headers with TableSortLabel', () => {
            const onSort = jest.fn();
            render(<DataTable {...defaultProps} onSort={onSort} />);

            // ID header has sortKey, so it should be clickable
            const idHeader = screen.getByText('ID');
            expect(idHeader.closest('span')).toHaveClass('MuiTableSortLabel-root');

            // Name header has no sortKey, so it should be plain text
            const nameHeader = screen.getByText('Name');
            expect(nameHeader.closest('span')).not.toHaveClass('MuiTableSortLabel-root');
        });

        it('calls onSort with ascending on first click', () => {
            const onSort = jest.fn();
            render(<DataTable {...defaultProps} onSort={onSort} />);

            fireEvent.click(screen.getByText('ID'));

            expect(onSort).toHaveBeenCalledWith({field: 'id', direction: 'asc'});
        });

        it('calls onSort with descending when currently ascending', () => {
            const onSort = jest.fn();
            const pageable: SpringPageable<TestItem> = {
                ...testPageable,
                sort: new Set([{field: 'id', direction: 'asc'}]),
            };
            render(
                <DataTable
                    {...defaultProps}
                    pageable={pageable}
                    onSort={onSort}
                />
            );

            fireEvent.click(screen.getByText('ID'));

            expect(onSort).toHaveBeenCalledWith({field: 'id', direction: 'desc'});
        });

        it('calls onSort with removeSortKey when currently descending', () => {
            const onSort = jest.fn();
            const pageable: SpringPageable<TestItem> = {
                ...testPageable,
                sort: new Set([{field: 'id', direction: 'desc'}]),
            };
            render(
                <DataTable
                    {...defaultProps}
                    pageable={pageable}
                    onSort={onSort}
                />
            );

            fireEvent.click(screen.getByText('ID'));

            expect(onSort).toHaveBeenCalledWith({field: 'id', direction: 'desc'}, true);
        });

        it('renders search bar when searchKey and onFilter are provided', () => {
            const onFilter = jest.fn();
            render(
                <DataTable
                    {...defaultProps}
                    searchKey="needle"
                    onFilter={onFilter}
                />
            );

            expect(screen.getByLabelText('Search')).toBeInTheDocument();
        });

        it('does not render search bar without searchKey', () => {
            const onFilter = jest.fn();
            render(<DataTable {...defaultProps} onFilter={onFilter} />);

            expect(screen.queryByLabelText('Search')).not.toBeInTheDocument();
        });

        it('does not render search bar without onFilter', () => {
            render(<DataTable {...defaultProps} searchKey="needle" />);

            expect(screen.queryByLabelText('Search')).not.toBeInTheDocument();
        });

        it('calls onFilter with search key on apply', () => {
            const onFilter = jest.fn();
            render(
                <DataTable
                    {...defaultProps}
                    searchKey="needle"
                    onFilter={onFilter}
                />
            );

            const input = screen.getByLabelText('Search');
            fireEvent.change(input, {target: {value: 'test query'}});

            // Click the search/apply button
            fireEvent.click(getButtonByIcon('SearchRoundedIcon'));

            expect(onFilter).toHaveBeenCalledWith({needle: 'test query'});
        });

        it('calls onFilter on Enter key press', () => {
            const onFilter = jest.fn();
            render(
                <DataTable
                    {...defaultProps}
                    searchKey="needle"
                    onFilter={onFilter}
                />
            );

            const input = screen.getByLabelText('Search');
            fireEvent.change(input, {target: {value: 'enter query'}});
            fireEvent.keyDown(input, {key: 'Enter'});

            expect(onFilter).toHaveBeenCalledWith({needle: 'enter query'});
        });

        it('clears search and calls onFilter without search key', () => {
            const onFilter = jest.fn();
            const pageable: SpringPageable<TestItem> = {
                ...testPageable,
                filter: {needle: 'existing', status: 'active'},
            };
            render(
                <DataTable
                    {...defaultProps}
                    pageable={pageable}
                    searchKey="needle"
                    onFilter={onFilter}
                />
            );

            // Clear button should be visible since filter has a value
            fireEvent.click(getButtonByIcon('ClearRoundedIcon'));

            // Should remove needle but preserve other filter keys
            expect(onFilter).toHaveBeenCalledWith({status: 'active'});
        });

        it('preserves other filter keys when applying search', () => {
            const onFilter = jest.fn();
            const pageable: SpringPageable<TestItem> = {
                ...testPageable,
                filter: {status: 'active'},
            };
            render(
                <DataTable
                    {...defaultProps}
                    pageable={pageable}
                    searchKey="needle"
                    onFilter={onFilter}
                />
            );

            const input = screen.getByLabelText('Search');
            fireEvent.change(input, {target: {value: 'query'}});
            fireEvent.keyDown(input, {key: 'Enter'});

            expect(onFilter).toHaveBeenCalledWith({status: 'active', needle: 'query'});
        });

        it('renders custom filterInputs', () => {
            render(
                <DataTable
                    {...defaultProps}
                    filterInputs={<div data-testid="custom-filter">Custom</div>}
                />
            );

            expect(screen.getByTestId('custom-filter')).toBeInTheDocument();
        });

        it('renders pagination when pageable is provided', () => {
            const multiPageData: SpringPage<TestItem> = {
                ...testPage,
                totalElements: 100,
                totalPages: 4,
            };
            render(
                <DataTable
                    {...defaultProps}
                    page={multiPageData}
                />
            );

            expect(screen.getByText('Rows:')).toBeInTheDocument();
        });

        it('does not render pagination when pageable is undefined', () => {
            render(
                <DataTable
                    {...defaultProps}
                    pageable={undefined}
                />
            );

            expect(screen.queryByText('Rows:')).not.toBeInTheDocument();
        });
    });

    describe('mobile view', () => {
        beforeEach(() => {
            mockUseMediaQuery.mockReturnValue(true);
        });

        it('renders list rows instead of table', () => {
            render(<DataTable {...defaultProps} />);

            expect(screen.getByTestId('list-item-1')).toBeInTheDocument();
            expect(screen.getByTestId('list-item-2')).toBeInTheDocument();
            expect(screen.getByTestId('list-item-3')).toBeInTheDocument();
            expect(screen.queryByRole('table')).not.toBeInTheDocument();
        });

        it('does not render table headers', () => {
            render(<DataTable {...defaultProps} />);

            expect(screen.queryByText('ID')).not.toBeInTheDocument();
        });

        it('renders sort button when sortable headers and onSort exist', () => {
            const onSort = jest.fn();
            render(<DataTable {...defaultProps} onSort={onSort} />);

            expect(screen.getByTestId('SortRoundedIcon')).toBeInTheDocument();
        });

        it('does not render sort button without onSort', () => {
            render(<DataTable {...defaultProps} />);

            expect(screen.queryByTestId('SortRoundedIcon')).not.toBeInTheDocument();
        });

        it('opens sort dialog on sort button click', () => {
            const onSort = jest.fn();
            render(<DataTable {...defaultProps} onSort={onSort} />);

            fireEvent.click(getButtonByIcon('SortRoundedIcon'));

            expect(screen.getByText('Sort by')).toBeInTheDocument();
            // Only sortable headers should appear in the dialog
            expect(screen.getByText('ID')).toBeInTheDocument();
        });

        it('triggers sort from mobile sort dialog', () => {
            const onSort = jest.fn();
            render(<DataTable {...defaultProps} onSort={onSort} />);

            // Open sort dialog
            fireEvent.click(getButtonByIcon('SortRoundedIcon'));

            // Click sort option
            fireEvent.click(screen.getByText('ID'));

            expect(onSort).toHaveBeenCalledWith({field: 'id', direction: 'asc'});
        });

        it('renders search bar on mobile when searchKey and onFilter are provided', () => {
            const onFilter = jest.fn();
            render(
                <DataTable
                    {...defaultProps}
                    searchKey="needle"
                    onFilter={onFilter}
                />
            );

            expect(screen.getByLabelText('Search')).toBeInTheDocument();
        });

        it('renders filter button when filterInputs are provided', () => {
            render(
                <DataTable
                    {...defaultProps}
                    filterInputs={<div data-testid="custom-filter">Custom</div>}
                />
            );

            expect(screen.getByTestId('FilterListRoundedIcon')).toBeInTheDocument();
        });

        it('opens filter dialog on filter button click', () => {
            render(
                <DataTable
                    {...defaultProps}
                    filterInputs={<div data-testid="custom-filter">Custom</div>}
                />
            );

            fireEvent.click(getButtonByIcon('FilterListRoundedIcon'));

            expect(screen.getByText('Filters')).toBeInTheDocument();
            expect(screen.getByTestId('custom-filter')).toBeInTheDocument();
        });

        it('renders compact pagination on mobile', () => {
            const multiPageData: SpringPage<TestItem> = {
                ...testPage,
                totalElements: 100,
                totalPages: 4,
            };
            const pageable: SpringPageable<TestItem> = {size: 25, page: 0};
            const onPageNumber = jest.fn();
            render(
                <DataTable
                    {...defaultProps}
                    page={multiPageData}
                    pageable={pageable}
                    onPageNumber={onPageNumber}
                />
            );

            // Should show page buttons (1, 2, 3, 4)
            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
            // Should NOT show "Rows:" label (that's desktop only)
            expect(screen.queryByText('Rows:')).not.toBeInTheDocument();
        });
    });
});
