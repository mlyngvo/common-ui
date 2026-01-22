import React, {
    createContext,
    type PropsWithChildren,
    type ReactElement,
    useContext, useEffect,
    useMemo,
    useState
} from 'react';
import { Typography } from '@mui/material';

type IPageTitleContext = {
    title: string;
    setTitle: (lang: string) => void;
}

const PageTitleContext = createContext<IPageTitleContext>({
    title: '',
    setTitle: () => {
        throw new Error('Not implemented');
    },
});

const usePageTitle = () => useContext(PageTitleContext);

export function createPageTitleProvider(appTitle: string) {

    function PageTitleProvider({children}: PropsWithChildren) {
        const [title, setTitle] = useState('');

        const value = useMemo(() => ({
            title,
            setTitle
        }), [title]);

        useEffect(() => {
            document.title = [title, appTitle].filter(t => t.length > 0).join(' | ');
        }, [title, appTitle]);

        return (
            <PageTitleContext
                value={value}
            >
                {children}
            </PageTitleContext>
        );
    }

    return {
        PageTitleProvider,
        usePageTitle
    };
}

interface PageTitleProperties {
    title: string;
    actions?: ReactElement;
}

export function PageTitle({title, actions}: PageTitleProperties) {
    const {setTitle} = usePageTitle();

    useEffect(() => {
        setTitle(title);
    }, [title, setTitle]);

    return (
        <>
            <Typography variant="h2" slot="h1">
                {title}
            </Typography>
            {actions}
        </>
    );
}
