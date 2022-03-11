import Dialog from "@mui/material/Dialog";
import React, { ReactElement } from "react";

interface PreviewDialogProps {
    url: string;
    open: any;
    setOpen?: any;
}

export default function PreviewDialog(props: PreviewDialogProps) {
    const { url, open, setOpen } = props;
    console.log(url);
    return (
        <Dialog
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            fullWidth
            maxWidth="lg"
        >
            <iframe
                src={
                    "https://docs.google.com/viewer?url=https://github.com/khanhquoc1805/Server_QLCV/blob/main/" +
                    url +
                    "&embedded=true"
                }
                style={{ width: "100%", height: "768px" }}
                frameBorder="0"
            ></iframe>
        </Dialog>
    );
}
