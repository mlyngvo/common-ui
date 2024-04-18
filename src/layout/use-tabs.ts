import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {storage} from '../utils';

export function useTabs(key: string) {
    const navigate = useNavigate();

    const [tab, setTab] = useState(0);

    useEffect(() => {
        const parameters = new URLSearchParams(window.location.search);
        const tabParameter = parameters.get('tab');
        if (tabParameter !== null) {
            try {
                // eslint-disable-next-line radix
                setTab(Number.parseInt(tabParameter));
                return;
            } catch {
                console.error('Invalid tab param.');
            }
        }

        const stored = storage.get<number>(key);
        if (stored !== undefined) {
            changeTab(stored, true);
        }
    }, []);

    function changeTab(index: number, replace: boolean|undefined = false) {
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

        navigate(`${window.location.pathname}?${accu.join('&')}`, { replace });
    }

    return {
        tab,
        changeTab
    };
}