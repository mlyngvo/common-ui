import React from 'react';
import {Chip, Sheet, Stack, Typography} from '@mui/joy';

export function DemoTypography() {

    function renderChip(label: string) {
        return <Chip variant="soft" color="primary" size="sm" sx={{ minWidth: 100, textAlign: 'center' }}>{label}</Chip>;
    }

    return (
        <Sheet variant="outlined" sx={{ p: 3 }}>
            <Stack
                direction="column"
                spacing={3}
            >
                <div>
                    {['h1', 'h2', 'h3', 'h4'].map((h, index) => (
                        <Stack
                            key={h}
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            mb={1}
                        >
                            {renderChip(h)}
                            <Typography level={h as any}>Heading {index + 1}</Typography>
                        </Stack>
                    ))}
                </div>

                <div>
                    {['lg', 'md', 'sm'].map(index => (
                        <Stack
                            key={index}
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            mb={1}
                        >
                            {renderChip(`title-${  index}`)}
                            <Typography level={`title-${  index}` as any}>Corporis dignissimos ducimus eius illum</Typography>
                        </Stack>
                    ))}
                </div>

                <div>
                    {['lg', 'md', 'sm', 'xs'].map(index => (
                        <Stack
                            key={index}
                            direction="row"
                            alignItems="baseline"
                            spacing={1}
                            mb={1}
                        >
                            {renderChip(`body-${  index}`)}
                            <Typography level={`body-${  index}` as any} textAlign="justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias architecto consectetur eaque esse est, ex illum incidunt ipsa laboriosam natus nostrum pariatur perferendis possimus qui voluptatem voluptates, voluptatibus.</Typography>
                        </Stack>
                    ))}
                </div>

                <div>
                    {renderChip('code')}
                    <Sheet variant="solid" sx={{ px: 3, py: 0.5, mt: 1 }}>
                        <pre>{JSON.stringify({foo: 'bar'}, undefined, 3)}</pre>
                    </Sheet>
                </div>
            </Stack>
        </Sheet>
    );
}