import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import {Accordion, AccordionDetails, AccordionSummary, Box, Dialog, DialogContent, Stack, Typography} from '@mui/material';
import React, {Component, type ErrorInfo, Fragment, type PropsWithChildren} from 'react';

interface ErrorContext {
    url: string;
    referrer: string;
    userAgent: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getDerivedStateFromError(error: any) {
        // Store error context
        ErrorBoundary.errorContext = {
            url: window.location.href,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
                let value = o.value;
                try {
                    value = JSON.stringify(JSON.parse(value ?? ''), undefined, 3);
                } catch (error) {
                    console.error('Cannot parse value', error);
                }
                return (
                    <Fragment key={`kv-${index}`} >
                        <Typography variant="body2">{o.key}</Typography>
                        <Box component="code" sx={{ ...codeSx, mb: 2 }}>
                            {value}
                        </Box>
                    </Fragment>
                );
            });
    }

    render() {
         
        if (!this.state.hasError) return this.props.children;
        const {
            errorContext: {
                error,
                url,
                referrer,
                userAgent
            } = {}} = ErrorBoundary;

        return (
            <Dialog open>
                <DialogContent
                    sx={{
                        overflow: 'scroll',
                        mx: 'calc(-1 * var(--ModalDialog-padding))',
                        px: 'var(--ModalDialog-padding)',
                    }}
                >
                    <Stack
                        direction="column"
                        alignItems="center"
                    >
                        <ErrorOutlineRoundedIcon sx={{ color: 'var(--joy-palette-danger-500)', fontSize: '4rem' }} />
                        <Typography variant="h3" textAlign="center" sx={{ mb: 3 }}>Oops, something went wrong!</Typography>
                    </Stack>

                    <Accordion>
                        <AccordionSummary
                            sx={() => ({
                                '& > button': {
                                    // background: theme.palette.background.level3,
                                    borderRadius: 5,
                                    '&:hover': {
                                        // background: `${theme.palette.background.level2} !important`,
                                    }
                                }
                            })}
                        >
                            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                            {error?.message}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack
                                direction="column"
                                gap={1}
                            >
                                <div>
                                    <Typography variant="body2"><strong>URL</strong></Typography>
                                    <Box component="code" sx={codeSx}>{url}</Box>
                                </div>

                                <div>
                                    <Typography variant="body2"><strong>Referrer</strong></Typography>
                                    <Box component="code" sx={codeSx}>{referrer}</Box>
                                </div>

                                <div>
                                    <Typography variant="body2"><strong>User-Agent</strong></Typography>
                                    <Box component="code" sx={codeSx}>{userAgent}</Box>
                                </div>

                                <div>
                                    <Typography variant="body2"><strong>Trace</strong></Typography>
                                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                                    <Box component="code" sx={codeSx}>{error?.stack}</Box>
                                </div>

                                <div>
                                    <Typography variant="body2"><strong>Session Storage</strong></Typography>
                                    {this.renderStorage(sessionStorage)}
                                </div>

                                <div>
                                    <Typography variant="body2"><strong>Local Storage</strong></Typography>
                                    {this.renderStorage(localStorage)}
                                </div>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </DialogContent>
            </Dialog>
        );
    }
}