export function readFromStorage(storage: Storage, key: string): string | null {
    return storage.getItem(key);
}

export function saveToStorage(storage: Storage, key: string, value: string) {
    storage.setItem(key, value);
}