import {Box, Button, Card, CardActions, CardContent, Grid, Typography} from '@mui/material';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

import {Body, PageTitle} from '../../src';
import {ColorSchemeToggle} from '../../src/layout/color-scheme-toggle';

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
        description: 'Various display component.',
        path: '/display',
    }
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