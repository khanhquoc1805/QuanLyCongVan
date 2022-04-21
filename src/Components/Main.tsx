import { Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPermission } from "../Utils/getValueFormToken";
import AvatarUser from "./AvatarUser";
import MenuItem from "./MenuItem";

export default function Main() {
    const [permission, setPermission] = useState<string>();
    const token = localStorage.getItem("access_token");
    useEffect(() => {
        (() => {
            const permissionUser = getPermission();
            setPermission(permissionUser);
        })();
    }, []);
    return token ? (
        <div>
            <div style={{ margin: "24px 24px 0px 0px" }}>
                <AvatarUser></AvatarUser>
            </div>

            <Stack direction="row" spacing={8} justifyContent="center" mt={20}>
                {permission === "admin" && (
                    <Link
                        to="/quantringuoidung"
                        style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "black",
                            fontSize: "18px",
                        }}
                    >
                        <MenuItem
                            iconURL="/user-svgrepo-com.svg"
                            title="Quản Lý Người Dùng"
                        ></MenuItem>
                    </Link>
                )}

                <Link
                    to="/quanlyso"
                    style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "black",
                        fontSize: "18px",
                    }}
                >
                    <MenuItem
                        iconURL="/notebook-svgrepo-com.svg"
                        title="Quản Lý Sổ"
                    ></MenuItem>
                </Link>
                <Link
                    to="/quanlycongvanden"
                    style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "black",
                        fontSize: "18px",
                    }}
                >
                    <MenuItem
                        iconURL="/document-svgrepo-com.svg"
                        title="Công Văn Đến"
                    ></MenuItem>
                </Link>
                <Link
                    to="/quanlycongvandi"
                    style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "black",
                        fontSize: "18px",
                    }}
                >
                    <MenuItem
                        iconURL="/exit-svgrepo-com.svg"
                        title="Công Văn Đi"
                    ></MenuItem>
                </Link>
                <Link
                    to="/tracuutimkiem"
                    style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "black",
                        fontSize: "18px",
                    }}
                >
                    <MenuItem
                        iconURL="/search-svgrepo-com.svg"
                        title="Tra Cứu"
                    ></MenuItem>
                </Link>
            </Stack>
        </div>
    ) : (
        <></>
    );
}
