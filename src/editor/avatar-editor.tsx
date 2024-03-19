import React, {useEffect, useRef, useState} from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import {Button, Slider, Stack, styled} from '@mui/joy';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
`;

interface AvatarEditorProperties {
    defaultImageUrl?: string;
    onSave: (imageData: string) => void;
    onCancel: () => void;
    i18n?: {
        uploadFile?: string;
        save?: string;
        cancel?: string;
    }
}

export function AvatarEditor({defaultImageUrl, onSave, onCancel, i18n}: AvatarEditorProperties) {
    const [file, setFile] = useState<File>();
    const editor = useRef<ReactAvatarEditor|null>(null);

    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (defaultImageUrl !== undefined) {
            fetch(defaultImageUrl)
                .then(async response => {
                    setFile(new File([await response.blob()], 'preview.png'));
                })
                .catch(error => {
                    console.error('Failed to fetch logo', error);
                });
        }
    }, [defaultImageUrl]);

    function handleFileSelect(files: FileList|null) {
        if (files !== null && files.length > 0) {
            setFile(files[0]);
        }
    }

    function handleScale(s: number|number[]) {
        setScale((typeof s === 'number') ? s : s[0]);
    }

    function handleSave() {
        if (editor.current !== null) {
            onSave(editor.current?.getImageScaledToCanvas().toDataURL('image/png', 1));
        }
    }

    const {
        uploadFile,
        save,
        cancel
    } = i18n ?? {};
    return (
        <Stack
            direction="column"
            justifyContent="center"
            gap={1.5}
        >
            {file !== undefined && (
                <>
                    <ReactAvatarEditor
                        ref={editor}
                        image={file}
                        width={256}
                        height={256}
                        scale={scale}
                        border={0}
                        style={{ width: '100%', height: '100%', background: '#fff', border: '1px solid var(--joy-palette-neutral-300, #CDD7E1)', borderRadius: 7 }}
                    />
                    <Slider
                        marks
                        size="sm"
                        valueLabelDisplay="auto"
                        variant="solid"
                        step={0.1}
                        min={0.5}
                        max={1.5}
                        value={scale}
                        onChange={(_, v) => { handleScale(v); }}
                    />
                </>
            )}

            <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                startDecorator={<UploadFileRoundedIcon />}
            >
                {uploadFile ?? 'Upload a file'}
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={event_ => { handleFileSelect(event_.target.files); }}
                />
            </Button>

            {file !== undefined && (
                <Button
                    variant="solid"
                    color="primary"
                    startDecorator={<SaveRoundedIcon />}
                    onClick={handleSave}
                >
                    {save ?? 'Save'}
                </Button>
            )}

            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<CloseRoundedIcon />}
                onClick={onCancel}
            >
                {cancel ?? 'Cancel'}
            </Button>
        </Stack>
    );
}