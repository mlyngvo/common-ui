import {useAsync} from 'react-async-hook';
import {useEffect, useState} from 'react';
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

interface PaginationOptions<T> {
    paginationKey: string;
    fetch: (pageable: Pageable<T>) => Promise<Page<T>|undefined>;
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
        for (const [k, v] of filter.entries) {
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

export function usePagination<T>({paginationKey, fetch}: PaginationOptions<T>) {
    const [pageable, setPageable] = useState<Pageable<T>>({
        size: 25, page: 0
    });

    const {result: page, loading, error, execute: onReload} = useAsync(async () =>
            (pageable === undefined)
                ? undefined
                : await fetch(pageable)
        , [pageable]);

    useEffect(() => {
        const stored = storage.get<Pageable<T>>(paginationKey) ?? { size: 25, page: 0 };
        updatePageable(stored);
    }, []);

    function updatePageable(p: Pageable<T>) {
        setPageable(p);
        updateStorage(p);
    }

    function updateStorage(p: Pageable<T>) {
        storage.save<Pageable<T>>(paginationKey, p);
    }

    function onSort(sortKey: SortKey<T>) {
        updatePageable({
            ...pageable,
            sort: sortKey
        });
    }

    function onPageNumber(number: number) {
        updatePageable({
            ...pageable,
            page: number
        });
    }

    function onPageSize(size: number) {
        updatePageable({
            ...pageable,
            size,
        });
    }

    function onClear() {
        updatePageable({
            size: 25,
            page: 0
        });
    }

    return {
        page,
        loading,
        error,
        pageable,
        onSort,
        onPageNumber,
        onPageSize,
        onClear,
        onReload,
    };
}