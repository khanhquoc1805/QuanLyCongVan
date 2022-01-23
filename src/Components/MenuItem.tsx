import { Stack } from "@mui/material";

import React from "react";

interface MenuItemProps {
    iconURL : string;
    title : string;
}

export default function MenuItem(props : MenuItemProps) {
    return (
        <div>
            <Stack sx={{ width: 180, height: 160 }}>
                <img
                    src={props.iconURL}
                    alt=""
                />
                <p style={{textAlign: 'center'}}>{props.title}</p>
            </Stack>
        </div>
    );
}
