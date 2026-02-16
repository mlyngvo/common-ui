import {SpringPage, SpringPageable} from "../src/data/page";

export async function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }

const DEFAULT_SLEEP_MS = 1500;

export async function mockFetch<T>(data: T, sleepDuration?: number): Promise<T> {
    await sleep(sleepDuration ?? DEFAULT_SLEEP_MS);
    return data;
}

export async function mockFetchPageable<T>(data: Array<T>, pageable?: SpringPageable<T>, sleepDuration?: number): Promise<SpringPage<T>> {
    const {page = 0, size = 25} = pageable ?? {};
    await sleep(sleepDuration ?? DEFAULT_SLEEP_MS);
    const content = data.slice(page * size, page * size + size);
    if (pageable?.sort !== undefined) {
        for (const s of pageable.sort) {
            content.sort((a, b) => {
                if (s.direction === 'asc') {
                    return a[s.field] < b[s.field] ? -1 : 1;
                } else {
                    return a[s.field] > b[s.field] ? -1 : 1;
                }
            })
        }
    }
    const totalPages = Math.ceil(data.length / size);
    const isLast = page == totalPages;
    return {
        content,
        size,
        isFirst: page === 0,
        isLast,
        number: page,
        totalElements: data.length,
        totalPages
    };
}