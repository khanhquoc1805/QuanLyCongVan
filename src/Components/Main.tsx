import { Button, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

export default function Main() {
    const token = localStorage.getItem("access_token");

    return token ? (
        <div>
            <Stack direction="row" spacing={8} justifyContent="center" mt={20}>
                <Link
                    to="/quanlyso"
                    style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "black",
                    }}
                >
                    <MenuItem
                        iconURL="notebook-svgrepo-com.svg"
                        title="Quản Lý Sổ"
                    ></MenuItem>
                </Link>
                <Link
                    to="/quanlycongvanden"
                    style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "black",
                    }}
                >
                    <MenuItem
                        iconURL="document-svgrepo-com.svg"
                        title="Quản Lý Công Văn Đến"
                    ></MenuItem>
                </Link>
                <Link
                    to="/quanlycongvandi"
                    style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "black",
                    }}
                >
                    <MenuItem
                        iconURL="exit-svgrepo-com.svg"
                        title="Quản Lý Công Văn Đi"
                    ></MenuItem>
                </Link>
                <Link
                    to="/quanlyluutru"
                    style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "black",
                    }}
                >
                    <MenuItem
                        iconURL="file-storage-svgrepo-com.svg"
                        title="Quản Lý Lưu Trữ"
                    ></MenuItem>
                </Link>
            </Stack>
        </div>
    ) : (
        <></>
    );
}
