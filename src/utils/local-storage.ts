import dayjs from 'dayjs';
import Cookies from 'js-cookie';

interface LocalStorage {
    get: <T>(key: string) => T|undefined;
    save: <T>(key: string, value: T) => void;
    delete: (key: string) => void;
}

/**
 * Tests if localStorage is available and functional.
 * This properly detects private/incognito mode where localStorage exists but throws on writing.
 */
function isLocalStorageAvailable(): boolean {
    const testKey = '__storage_test__';
    try {
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
}

/**
 * LocalStorage implementation with error handling for edge cases
 * like quota exceeded or mid-session storage revocation.
 */
class LocalStorageImpl implements LocalStorage {

    private readonly engine = localStorage;

    get<T>(key: string): T | undefined {
        try {
            const data = this.engine.getItem(key);
            return data === null
                ? undefined
                : JSON.parse(data) as T;
        } catch {
            return undefined;
        }
    }

    save<T>(key: string, value: T): void {
        try {
            this.engine.setItem(key, JSON.stringify(value));
        } catch {
            // Storage full or not available - fail silently
        }
    }

    delete(key: string): void {
        try {
            this.engine.removeItem(key);
        } catch {
            // Storage not available - fail silently
        }
    }
}

/**
 * Cookie-based storage fallback for when localStorage is unavailable.
 * Used automatically in private/incognito mode on browsers that block localStorage.
 */
class CookieStorageImpl implements LocalStorage {

    private static readonly EXPIRATION_DAYS = 365;
    private readonly engine = Cookies;

    get<T>(key: string): T | undefined {
        const data = this.engine.get(key);
        return data === undefined
            ? undefined
            : JSON.parse(data) as T;
    }

    save<T>(key: string, value: T): void {
        const expires = dayjs()
            .add(CookieStorageImpl.EXPIRATION_DAYS, 'days')
            .toDate();
        this.engine.set(key, JSON.stringify(value), {
            expires
        });
    }

    delete(key: string): void {
        this.engine.remove(key);
    }
}

/**
 * Storage engine that automatically selects the best available storage mechanism.
 * Uses localStorage when available, falls back to cookies otherwise.
 */
class StorageEngine {

    private readonly engine: LocalStorage;

    constructor() {
        this.engine = isLocalStorageAvailable()
            ? new LocalStorageImpl()
            : new CookieStorageImpl();
    }

    get storage() {
        return this.engine;
    }
}

export const {storage} = new StorageEngine();