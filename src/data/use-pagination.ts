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
    fetch: (pageable: Pageable<T>) => Promise<Page<T>>;
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