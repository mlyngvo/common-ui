/**
 * Checks if a string is not empty after trimming whitespace.
 * @param str
 */
export function isNonBlank(str: string|undefined|null): str is string {
    return typeof str === 'string' && str.trim().length > 0;
}

/**
 * Checks if a string is not empty.
 * @param str
 */
export function isNonEmpty(str: string|undefined|null): str is string {
    return typeof str === 'string' && str.length > 0;
}