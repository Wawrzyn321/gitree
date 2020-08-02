import React from 'react';
//npm install use-state-with-callback
// export const useStorageState = storage => (initialValue, path) => {
//     let value = localStorage.getItem(path);
//     if (value === undefined) {
//         value = initialValue;
//     }
//     const [state, setState] = React.useState(value);
//     const saveState = newState => {
//         localStorage.setItem(path, newState);
//         setState(newState);
//     }
//     return [state, saveState];
// }

export const useLocalStorageState = (initialValue, path) => {
    const value = localStorage.getItem(path) || initialValue;
    const [state, setState] =  React.useState(value);
    const saveState = newState => {
        localStorage.setItem(path, newState);
        setState(newState);
    }
    return [state, saveState];
}

export const useSessionStorageState = (initialValue, path) => {
    const value = localStorage.getItem(path) || initialValue;
    const [state, setState] =  React.useState(value);
    const saveState = newState => {
        sessionStorage.setItem(path, newState);
        setState(newState);
    }
    return [state, saveState];
}