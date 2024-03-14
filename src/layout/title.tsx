import React, {
    createContext,
    type PropsWithChildren,
    type ReactElement,
    useContext,
    useMemo,
    useState
} from 'react';
import {Typography} from '@mui/joy';
import {Helmet} from 'react-helmet';

interface TitleProperties {
    title: string;
    actions?: ReactElement;
}

export function Title({title, actions}: TitleProperties) {

    return (
        <>
            <Typography level="h2" component="h1">
                {title}
            </Typography>
            {actions}
        </>
    );
}

interface IPageTitleContext {
    title: string;
    setTitle: (lang: string) => void;
}

export function createPageTitleProvider(appTitle: string) {
    const PageTitleContext = createContext<IPageTitleContext>({
        title: '',
        setTitle: () => {},
    });

    function PageTitleProvider({children}: PropsWithChildren) {
        const [title, setTitle] = useState('');

        const value = useMemo(() => ({
            title,
            setTitle
        }), [title]);

        return (
            <PageTitleContext.Provider
                value={value}
            >
                <Helmet>
                    <title>{[title, appTitle].filter(index => index !== undefined).join(' | ')}</title>
                </Helmet>
                {children}
            </PageTitleContext.Provider>
        );
    }

    const usePageTitle = () => useContext(PageTitleContext);

    return {
        PageTitleProvider,
        usePageTitle
    };
}