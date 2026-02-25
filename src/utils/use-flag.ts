import {useState} from 'react';

type useFlagType = [flag: boolean, set: () => void, clear: () => void, toggle: () => void];
export function useFlag(defaultValue: boolean): useFlagType {
    const [value, setValue] = useState(defaultValue);

    const setFlag = () => { setValue(true); };
    const clearFlag = () => { setValue(false); };
    const toggleFlag = () => { setValue(v => !v); };

    return [
        value,
        setFlag,
        clearFlag,
        toggleFlag
    ];
}