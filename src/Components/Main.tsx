import { Button, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

export default function Main() {
    return (
        <div>
            <Stack direction="row" spacing={3} justifyContent="center" mt={20}>
                <Link
                    to="/quanlyso"
                    style={{ textDecoration: "none", cursor: "pointer", color: 'black' }}
                >
                    <MenuItem
                        iconURL="ho-so-thanh-lap-cong-ty-tnhh-1-thanh-vien-e1534735449553.jpg"
                        title="Quản Lý Sổ"
                    ></MenuItem>
                </Link>
                <Link
                    to="/quanlycongvanden"
                    style={{ textDecoration: "none", cursor: "pointer", color: 'black' }}
                >
                    <MenuItem
                        iconURL="ho-so-thanh-lap-cong-ty-tnhh-1-thanh-vien-e1534735449553.jpg"
                        title="Quản Lý Công Văn Đến"
                    ></MenuItem>
                </Link>
                <Link
                    to="/quanlycongvandi"
                    style={{ textDecoration: "none", cursor: "pointer", color: 'black' }}
                >
                    <MenuItem
                        iconURL="ho-so-thanh-lap-cong-ty-tnhh-1-thanh-vien-e1534735449553.jpg"
                        title="Quản Lý Công Văn Đi"
                    ></MenuItem>
                </Link>
                <Link
                    to="/quanlyluutru"
                    style={{ textDecoration: "none", cursor: "pointer", color: 'black' }}
                >
                    <MenuItem
                        iconURL="ho-so-thanh-lap-cong-ty-tnhh-1-thanh-vien-e1534735449553.jpg"
                        title="Quản Lý Lưu Trữ"
                    ></MenuItem>
                </Link>
            </Stack>
        </div>
    );
}
