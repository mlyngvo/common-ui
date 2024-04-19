import {useAsync} from 'react-async-hook';
import {useEffect, useState} from 'react';
import {debounce} from 'lodash';
import {storage} from '../utils';

export interface Page<T> {
    content: T[];
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
    isLast: boolean;
}

export interface SortKey<T> {
    fields: Array<keyof T>;
    order: 'asc'|'desc';
}

export interface Pageable<T> {
    size: number;
    page: number,
    sort?: SortKey<T>;
    filter?: Record<string, any>;
}

export function createPageableParameters<T>({size, page, sort, filter}: Pageable<T>) {
    const parameters = [
        `size=${size}`,
        `page=${page}`
    ];
    if (sort !== undefined) {
        for (const field of sort.fields) {
            parameters.push(`sort=${encodeURIComponent(String(field))},${sort.order}`);
        }
    }
    if (filter !== undefined) {
        /* eslint-disable no-continue */
        for (const [k, v] of Object.entries(filter)) {
            if (v === undefined) continue;
            if (Array.isArray(v)) {
                for (const index of v) parameters.push(`${k}=${encodeURIComponent(String(index))}`);
                continue;
            }
            switch (typeof v) {
                case 'string':
                case 'number': {
                    parameters.push(`${k}=${encodeURIComponent(String(v))}`);
                    break;
                }
                default: {
                    console.warn(`Key (${k}) has the value of unsupported type (${typeof v}). This param will be ignored.`);
                }
            }
        }
        /* eslint-enable no-continue */
    }
    return parameters.join('&');
}

const DEFAULT_PAGEABLE = { size: 25, page: 0 };

interface PaginationOptions<T> {
    paginationKey: string;
    fetch: (pageable: Pageable<T>) => Promise<Page<T>|undefined>;
    inMemory?: boolean;
}

export function usePagination<T>({paginationKey, fetch, inMemory = false}: PaginationOptions<T>) {
    const [pageable, setPageable] = useState<Pageable<T>>();

    const {result: page, loading, error, execute: onReload} = useAsync(async () =>
            (pageable === undefined)
                ? undefined
                : await fetch(pageable)
        , [pageable]);

    useEffect(() => {
        let initialPageable = (!inMemory)
            ? storage.get<Pageable<T>>(paginationKey) ?? DEFAULT_PAGEABLE
            : DEFAULT_PAGEABLE
        updatePageable(initialPageable);
    }, []);

    function updatePageable(p: Pageable<T>) {
        setPageable(p);
        if (!inMemory) {
            updateStorage(p);
        }
    }

    function updateStorage(p: Pageable<T>) {
        storage.save<Pageable<T>>(paginationKey, p);
    }

    function onSort(sortKey: SortKey<T>) {
        updatePageable({
            ...(pageable ?? DEFAULT_PAGEABLE),
            sort: sortKey
        });
    }

    function onPageNumber(number: number) {
        updatePageable({
            ...(pageable ?? DEFAULT_PAGEABLE),
            page: number
        });
    }

    function onPageSize(size: number) {
        updatePageable({
            ...(pageable ?? DEFAULT_PAGEABLE),
            size,
            page: 0
        });
    }

    const onFilter = debounce((filter: Record<string, any>) => {
        updatePageable({
            ...(pageable ?? DEFAULT_PAGEABLE),
            filter,
            page: 0
        });
    }, 500);

    function onClear() {
        updatePageable(DEFAULT_PAGEABLE);
    }

    return {
        page,
        loading,
        error,
        pageable,
        onSort,
        onPageNumber,
        onPageSize,
        onFilter,
        onClear,
        onReload,
    };
}