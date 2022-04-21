import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import NhanVienAPI, { NhanVien } from "../API/NhanVien";
import userApi from "../API/User";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { authActions, selectAccessToken } from "../features/Auth/authSlice";
import { getMaNVFromToken } from "../Utils/getValueFormToken";

interface Props {}

export default function AvatarUser() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const access_token = localStorage.getItem("access_token");
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const [nv, SetNV] = React.useState<NhanVien>();
    const manv = getMaNVFromToken();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLogOut = async () => {
        setAnchorElUser(null);
        dispatch(authActions.logout());
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    React.useEffect(() => {
        (() => {
            if (!access_token) {
                navigate("/");
                window.location.reload();
            }
        })();
    }, [access_token]);

    React.useEffect(() => {
        (async () => {
            const responseNV = await NhanVienAPI.getNhanVienByManv(manv);
            SetNV(responseNV);
        })();
    }, []);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
            }}
        >
            <p style={{ marginRight: "12px" }}>{nv?.tennv}</p>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleLogOut}>
                    <Typography textAlign="center">Đăng xuất</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}
