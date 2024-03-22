import React from "react";
import {Divider, Modal, ModalDialog, Typography} from "@mui/joy";
import {AvatarEditor} from "../../src";

export function DemoAvatarEditor() {

    function handlePhoto(data: string) {
        console.info("data", data)
    }

    return (
        <Modal open={true}>
            <ModalDialog>
                <Typography level="title-lg">Avatar Editor</Typography>
                <Divider />
                <AvatarEditor
                    defaultImageUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                    onSave={handlePhoto}
                    onCancel={() => undefined}
                    i18n={{
                        uploadFile: 'Upload a File',
                        save: 'Save',
                        cancel: 'Cancel'
                    }}
                />
            </ModalDialog>
        </Modal>
    )
}