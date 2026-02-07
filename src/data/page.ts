export interface SpringPage<T> {
    content: Array<T>;
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
    isLast: boolean;
    isFirst: boolean;
}