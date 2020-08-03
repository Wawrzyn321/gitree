import React from 'react';

interface Storage {
    getItem: (path: string) => any,
    setItem: (path: string, item: any) => void,
}

// i cant name that "useStorageState"
export const react_sucks_here = (storage: Storage) => (initialValue: any, path: string) => {
    const value = storage.getItem(path) || initialValue;
    const [state, setState] = React.useState(value);
    const saveState = (newState: any) => {
        storage.setItem(path, newState);
        setState(newState);
    }
    return [state, saveState];
}

export const useLocalStorageState = react_sucks_here(localStorage);
export const useSessionStorageState = react_sucks_here(sessionStorage);
