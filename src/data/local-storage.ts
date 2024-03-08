import dayjs from "dayjs";

interface LocalStorage {
    get<T>(key: string): T|undefined;
    save<T>(key: string, value: T): void;
    delete(key: string): void;
}

class LocalStorageImpl implements LocalStorage {

    get<T>(key: string): T | undefined {
        const data = localStorage.getItem(key);
        return data
            ? JSON.parse(data)
            : undefined;
    }

    save<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    delete(key: string): void {
        localStorage.removeItem(key);
    }
}

class CookieStorageImpl implements LocalStorage {

    private static readonly EXPIRATION_DAYS = 365;

    get<T>(key: string): T | undefined {
        for (let cookie of decodeURIComponent(document.cookie).split(';')) {
            const [name, value] = cookie.split('=');
            if (name === key) {
                return JSON.parse(value) as T;
            }
        }
    }

    save<T>(key: string, value: T): void {
        const expires = dayjs()
            .add(CookieStorageImpl.EXPIRATION_DAYS, "days")
            .toDate()
            .toUTCString();
        document.cookie = `${key}=${value};expires=${expires};path=/`;
    }

    delete(key: string): void {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

class StorageEngine {

    private _storage: LocalStorage;

    constructor() {
        if (!window.localStorage) {
            this._storage = new LocalStorageImpl();
        } else {
            this._storage = new CookieStorageImpl();
        }
    }

    get storage() {
        return this._storage;
    }
}

export const storage = new StorageEngine().storage;