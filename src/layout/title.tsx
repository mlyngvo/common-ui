import React, {
    createContext,
    type PropsWithChildren,
    type ReactElement,
    useContext, useEffect,
    useMemo,
    useState
} from 'react';
import {Typography} from '@mui/joy';
import {Helmet} from 'react-helmet';

interface IPageTitleContext {
    title: string;
    setTitle: (lang: string) => void;
}

const PageTitleContext = createContext<IPageTitleContext>({
    title: '',
    setTitle: () => {},
});

const usePageTitle = () => useContext(PageTitleContext);

export function createPageTitleProvider(appTitle: string) {

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
                    {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
                    <title>{[title, appTitle].filter(index => !!index).join(' | ')}</title>
                </Helmet>
                {children}
            </PageTitleContext.Provider>
        );
    }

    return {
        PageTitleProvider,
        usePageTitle
    };
}

interface TitleProperties {
    title: string;
    actions?: ReactElement;
}

export function Title({title, actions}: TitleProperties) {
    const {setTitle} = usePageTitle();

    useEffect(() => {
        setTitle(title);
    }, [title, setTitle]);

    return (
        <>
            <Typography level="h2" component="h1">
                {title}
            </Typography>
            {actions}
        </>
    );
}

