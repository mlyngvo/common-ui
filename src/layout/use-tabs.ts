import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {storage} from '../utils';

export function useTabs(key: string) {
    const navigate = useNavigate();

    const [tab, setTab] = useState(0);

    useEffect(() => {
        const stored = storage.get<number>(key);
        if (stored !== undefined) {
            changeTab(stored);
        }
    }, []);

    function changeTab(index: number) {
        setTab(index);
        storage.save(key, index);

        const parameters = new URLSearchParams(window.location.search);
        const accu: string[] = [];
        for (const [k, v] of parameters.entries()) {
            if (k !== 'tab') {
                accu.push(`${k}=${v}`);
            }
        }
        accu.push(`tab=${index}`);

        navigate(`${window.location.pathname}?${accu.join('&')}`);
    }

    return {
        tab,
        changeTab
    };
}