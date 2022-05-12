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
        <div
            style={{
                // backgroundColor: "#e8f4ff",
                //height: "100vh",
                background:
                    "-webkit-radial-gradient(center, ellipse cover,  #e8f4ff 1%,#5FAAE8 100%)" /* Chrome10+,Safari5.1+ */,
                filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#D378E2', endColorstr='#460253',GradientType=1 )" /* IE6-9 fallback on horizontal gradient */,
                height: "calc(100vh)",
                width: "100%",
            }}
        >
            <div
                style={{
                    padding: "24px 24px 0px 0px",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <AvatarUser></AvatarUser>
            </div>

            <div
                style={{
                    textAlign: "center",
                    fontSize: "40px",
                    marginTop: "12px",
                    color: "#B52881",
                    fontFamily: "coiny",
                    fontWeight: "bolder",
                }}
            >
                HỆ THỐNG QUẢN LÝ CÔNG VĂN
            </div>

            <Stack direction="row" spacing={4} justifyContent="center" mt={15}>
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
