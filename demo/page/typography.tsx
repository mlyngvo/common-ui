import {Card, CardContent, Divider, Grid, Stack, Typography} from '@mui/material';
import React from 'react';
import {useNavigate} from "react-router-dom";

import {Body, Breadcrumbs, PageTitle} from '../../src';

const VARIANTS = [
    {variant: 'h1', label: 'h1. Heading'},
    {variant: 'h2', label: 'h2. Heading'},
    {variant: 'h3', label: 'h3. Heading'},
    {variant: 'h4', label: 'h4. Heading'},
    {variant: 'h5', label: 'h5. Heading'},
    {variant: 'h6', label: 'h6. Heading'},
    {variant: 'subtitle1', label: 'subtitle1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {variant: 'subtitle2', label: 'subtitle2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {variant: 'body1', label: 'body1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    {variant: 'body2', label: 'body2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    {variant: 'caption', label: 'caption. Lorem ipsum dolor sit amet.'},
    {variant: 'overline', label: 'overline text'},
] as const;

export default function TypographyPage() {
    const navigate = useNavigate();

    return (
        <Body
            title={<PageTitle title="Typography" />}
            top={
                <Breadcrumbs
                    onHomeClick={() => navigate('/')}
                    items={[
                        {label: 'Typography'},
                    ]}
                />
            }
        >
            <Grid container spacing={2}>
                <Grid size={{xs: 12, md: 8}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Variants</Typography>
                            <Stack spacing={2} divider={<Divider />}>
                                {VARIANTS.map(({variant, label}) => (
                                    <Stack key={variant} direction="row" spacing={2} alignItems="baseline">
                                        <Typography
                                            variant="caption"
                                            color="textSecondary"
                                            sx={{minWidth: 80, flexShrink: 0}}
                                        >
                                            {variant}
                                        </Typography>
                                        <Typography variant={variant}>
                                            {label}
                                        </Typography>
                                    </Stack>
                                ))}
                                <Stack direction="row" spacing={2} alignItems="baseline">
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                        sx={{minWidth: 80, flexShrink: 0}}
                                    >
                                        code
                                    </Typography>
                                    <Typography>
                                        Inline <code>&lt;code&gt;</code> uses Martian Mono: <code>{'const x = 42;'}</code>
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{xs: 12, md: 4}}>
                    <Stack spacing={2}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Colors</Typography>
                                <Stack spacing={1}>
                                    <Typography color="textPrimary">Text Primary</Typography>
                                    <Typography color="textSecondary">Text Secondary</Typography>
                                    <Typography color="primary">Primary</Typography>
                                    <Typography color="secondary">Secondary</Typography>
                                    <Typography color="error">Error</Typography>
                                    <Typography color="warning">Warning</Typography>
                                    <Typography color="success">Success</Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Font Weights</Typography>
                                <Stack spacing={1}>
                                    <Typography fontWeight={300}>Light (300)</Typography>
                                    <Typography fontWeight={400}>Regular (400)</Typography>
                                    <Typography fontWeight={500}>Medium (500)</Typography>
                                    <Typography fontWeight={600}>Semi Bold (600)</Typography>
                                    <Typography fontWeight={700}>Bold (700)</Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Body>
    );
}
