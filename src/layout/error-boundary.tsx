import React, {Component, type ErrorInfo, Fragment, type PropsWithChildren} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from '@mui/material';
import {ExpandMore} from '@mui/icons-material';

interface ErrorContext {
    url: string;
    referrer: string;
    userAgent: string;
    error: any;
}

interface ErrorBoundaryProperties {
    /**
     * List of storage key patterns which values should be anonymized
     */
    anonymizeStorageKeyPatterns?: string[];
}

interface ErrorBoundaryStates {
    hasError: boolean;
}

const codeSx = {
    background: '#263238',
    color: '#fff',
    fontSize: '0.8rem',
    padding: 1,
    borderRadius: '3px',
    overflowX: 'auto',
    width: '100%'
};

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProperties>, ErrorBoundaryStates> {

    static defaultProps = {
        anonymizeStorageKeyPatterns: []
    };

    private static errorContext?: ErrorContext;

    constructor(properties: PropsWithChildren<ErrorBoundaryProperties>) {
        super(properties);
        this.state = {
            hasError: false
        };
    }

    /**
     * This lifecycle is invoked after an error has been thrown by a descendant component.
     * It receives the error that was thrown as a parameter and should return a value to update state.
     * @param error
     * @doc https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror
     */
    static getDerivedStateFromError(error: any) {
        // Store error context
        ErrorBoundary.errorContext = {
            url: window.location.href,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            error
        };
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('An error occurred', { error, errorInfo });
    }

    renderStorage(storage: Storage) {
        const {anonymizeStorageKeyPatterns= []} = this.props;
        const kv = [];
        for (let index = 0; index < storage.length; index += 1) {
            const key = storage.key(index);
            if (key !== null) {
                let value = storage.getItem(key);
                if (value !== null && anonymizeStorageKeyPatterns.some(p => key.includes(p))) {
                    value = '*****';
                }
                kv.push({ key, value });
            }
        }
        if (kv.length === 0) return <Box component="code" sx={{ ...codeSx, mb: 2 }}>NONE</Box>;
        return kv
            .sort((x, y) => x.key.localeCompare(y.key))
            .map((o, index) => {
                let {key, value} = o;
                try {
                    value = JSON.stringify(JSON.parse(value ?? ''), undefined, 3);
                } catch (error) {
                    console.error('Cannot parse value', error);
                }
                return (
                    <Fragment key={`kv-${index}`} >
                        <Typography variant="caption">{key}</Typography>
                        <Box component="code" sx={{ ...codeSx, mb: 2 }}>
                            {value}
                        </Box>
                    </Fragment>
                );
            });
    }

    render() {
        // eslint-disable-next-line react/destructuring-assignment
        if (!this.state.hasError) return this.props.children;
        const {
            errorContext: {
                error,
                url,
                referrer,
                userAgent
            } = {}} = ErrorBoundary;
        return (
            <Box p={3}>
                {/* <NotFound style={{ width: '100%', maxHeight: 300 }} /> */}
                {/* <Box p={4} /> */}
                <Typography variant="h2" align="center">Oops, something went wrong!</Typography>
                <Box p={2} />
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>{error?.message}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="overline"><strong>URL</strong></Typography>
                        <Box component="code" sx={codeSx}>{url}</Box>
                        <Box my={1} />
                        <Typography variant="overline"><strong>Referrer</strong></Typography>
                        <Box component="code" sx={codeSx}>{referrer}</Box>
                        <Box my={1} />
                        <Typography variant="overline"><strong>User-Agent</strong></Typography>
                        <Box component="code" sx={codeSx}>{userAgent}</Box>
                        <Box my={1} />
                        <Typography variant="overline"><strong>Trace</strong></Typography>
                        <Box component="code" sx={codeSx}>{error?.stack}</Box>
                        <Box my={1} />
                        <Typography variant="overline"><strong>Session Storage</strong></Typography>
                        {this.renderStorage(sessionStorage)}
                        <Box my={1} />
                        <Typography variant="overline"><strong>Local Storage</strong></Typography>
                        {this.renderStorage(localStorage)}
                    </AccordionDetails>
                </Accordion>
            </Box>
        );
    }
}