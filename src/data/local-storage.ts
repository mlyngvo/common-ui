import dayjs from 'dayjs';
import Cookies from 'js-cookie';

interface LocalStorage {
    get: <T>(key: string) => T|undefined;
    save: <T>(key: string, value: T) => void;
    delete: (key: string) => void;
}

class LocalStorageImpl implements LocalStorage {

    private readonly engine = localStorage;

    get<T>(key: string): T | undefined {
        const data = this.engine.getItem(key);
        return data === null
            ? undefined
            : JSON.parse(data);
    }

    save<T>(key: string, value: T): void {
        this.engine.setItem(key, JSON.stringify(value));
    }

    delete(key: string): void {
        this.engine.removeItem(key);
    }
}

class CookieStorageImpl implements LocalStorage {

    private static readonly EXPIRATION_DAYS = 365;
    private readonly engine = Cookies;

    get<T>(key: string): T | undefined {
        const data = this.engine.get(key);
        return data === undefined
            ? undefined
            : JSON.parse(data);
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

class StorageEngine {

    private readonly engine: LocalStorage;

    constructor() {
        this.engine = window.localStorage !== undefined
            ? new LocalStorageImpl()
            : new CookieStorageImpl();
    }

    get storage() {
        return this.engine;
    }
}

export const {storage} = new StorageEngine();