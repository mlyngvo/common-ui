import {debounce} from "lodash";
import {useCallback, useEffect, useState} from "react";

import {storage} from "../utils/local-storage";

export interface SpringPage<T> {
    content: Array<T>;
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
    isLast: boolean;
    isFirst: boolean;
}

export interface SortKey<T> {
    field: keyof T;
    direction: 'asc' | 'desc';
}

export interface SpringPageable<T> {
    size: number;
    page: number;
    sort?: Set<SortKey<T>>;
    filter?: Record<string, string|number>;
}

export function createPageableParams<T>({size, page, sort, filter}: SpringPageable<T>) {
    const params = [
        `size=${size}`,
        `page=${page}`,
    ];
    if (sort !== undefined) {
        for (const {field, direction} of sort) {
            params.push(`sort=${String(field)},${direction}`);
        }
    }
    if (filter !== undefined) {
        for (const [key, value] of Object.entries(filter)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
                for (const item of value) {
                    params.push(`${key}=${encodeURIComponent(String(item))}`);
                }
                continue;
            }
            switch (typeof value) {
                case 'string':
                case "number":
                    params.push(`${key}=${encodeURIComponent(String(value))}`);
                    break;
                default:
                    console.warn(`Unsupported filter (${key}) with value type: ${typeof value}.`);
            }
        }
    }
    return params.join('&');
}

export function serializePageable<T>(pageable: SpringPageable<T> | undefined) {
    if (pageable === undefined) return [];
    const { size, page, sort, filter } = pageable;
    const sortKeys = [...(sort ?? [])]
        .map(s => `${String(s.field)}:${s.direction}`)
        .sort();
    return [page, size, sortKeys, filter];
}

const DEFAULT_PAGEABLE = { size: 25, page: 0 };

interface PaginationOptions {
    paginationKey: string;
    persisted?: boolean;
}

export function usePagination<T>({paginationKey, persisted = true}: PaginationOptions) {
    const [pageable, setPageable] = useState<SpringPageable<T>>();

    function save(p: SpringPageable<T>) {
        const newSort = [];
        for (const sort of (p.sort ?? [])) {
            newSort.push(sort);
        }
        storage.save(paginationKey, { ...p, sort: newSort });
    }

    function update(p: SpringPageable<T>) {
        setPageable(p);
        if (persisted) save(p);
    }

    function read(): SpringPageable<T> {
        const stored = storage.get<SpringPageable<T>>(paginationKey);
        if (stored == undefined) return DEFAULT_PAGEABLE;
        return {
            ...stored,
            sort: new Set<SortKey<T>>(stored.sort ?? []),
        }
    }

    useEffect(() => {
        const init = persisted
            ? read()
            : DEFAULT_PAGEABLE;
        update(init);
    }, []);

    const onSort = useCallback((sortKey: SortKey<T>, removeSortKey: boolean|undefined = false) => {
        if (pageable != undefined) {
            const modified = new Set(pageable?.sort ?? []);
            for (const sort of modified) {
                if (sort.field === sortKey.field) {
                    modified.delete(sort);
                }
            }
            if (!removeSortKey) modified.add(sortKey);
            update({ ...pageable, sort: modified });
        }
    }, [pageable]);

    const onPageNumber = useCallback((page: number) => {
        if (pageable != undefined) {
            update({ ...pageable, page });
        }
    }, [pageable]);

    const onPageSize = useCallback((size: number) => {
        if (pageable != undefined) {
            update({ ...pageable, page: 0, size });
        }
    }, [pageable]);

    const onFilter = debounce(useCallback((filter: Record<string, string|number>) => {
        if (pageable != undefined) {
            update({
                ...pageable,
                page: 0,
                filter,
            });
        }
    }, [pageable]), 500);

    const onClear = useCallback(() => {
        if (pageable != undefined) {
            update(DEFAULT_PAGEABLE);
        }
    }, [pageable]);

    return {
        pageable,
        onSort,
        onPageNumber,
        onPageSize,
        onFilter,
        onClear,
    }
}