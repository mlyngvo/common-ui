import {useState} from 'react';

type useFlagType = [flag: boolean, set: () => void, clear: () => void];
export function useFlag(defaultValue: boolean): useFlagType {
    const [value, setValue] = useState(defaultValue);

    const setFlag = () => { setValue(true); };
    const clearFlag = () => { setValue(false); };

    return [
        value,
        setFlag,
        clearFlag
    ];
}