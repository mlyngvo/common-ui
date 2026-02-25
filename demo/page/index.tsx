import {Box, Button, Card, CardActions, CardContent, Grid, Typography} from '@mui/material';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

import {Body, ColorSchemeToggle, PageTitle} from '../../src';

const COMPONENTS = [
    {
        title: 'Layout',
        description: 'Various components that is used in application structure.',
        path: '/layout',
    },
    {
        title: 'Form',
        description: 'Various form components.',
        path: '/form',
    },
    {
        title: 'Display',
        description: 'Various display components.',
        path: '/display',
    },
    {
        title: 'Table',
        description: 'Various table components.',
        path: '/table',
    },
    {
        title: 'Localization',
        description: 'Text translation, enum translation, and locale-aware date components.',
        path: '/localization',
    },
    {
        title: 'Auth',
        description: 'Various authentication components.',
        path: '/auth',
    },
    {
        title: 'Typography',
        description: 'Typography variants, colors, and font weights.',
        path: '/typography',
    },
];

export default function IndexPage() {
    return (
        <Body
            title={<PageTitle title="Index" />}
        >
            <Grid
                container
                spacing={3}
            >
                {COMPONENTS.map((c, i) => (
                    <Grid
                        key={'comp-' + i}
                        size={{ xs: 12, sm: 3 }}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Card
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexGrow: 1
                            }}
                        >
                            <CardContent
                                sx={{
                                    flexGrow: 1
                                }}
                            >
                                <Typography variant="h5" gutterBottom>{c.title}</Typography>
                                <Typography color="textSecondary">{c.description}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={RouterLink} to={c.path}>Preview</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box my={3} />
            <div>
                <ColorSchemeToggle />
            </div>
        </Body>
    );
}