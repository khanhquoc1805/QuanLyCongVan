import { Paper, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";

import React from "react";

interface MenuItemProps {
    iconURL: string;
    title: string;
}

const useStyle = makeStyles({
    root: {
        "&:hover": {
            // transition:
            //     "filter .6s, opacity .6s, transform .6s, box-shadow .3s",
            backgroundColor: "#F6BDFF",
            // transform: "scale(1.2)",
            transition: "background 0.25s",
            cursor: "pointer",

        },
    },
});

export default function MenuItem(props: MenuItemProps) {
    const classes = useStyle();
    return (
        <Paper
            sx={{
                width: 240,
                height: 260,
                borderRadius: "16px",
                //backgroundColor: "#EBEBEB",
            }}
            className={classes.root}
        >
            <Stack sx={{ width: 180, height: 160, padding: "32px" }}>
                <img src={props.iconURL} alt="" />
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                    {props.title}
                </p>
            </Stack>
        </Paper>
    );
}
