import { Button, Menu, Stack } from "@mui/material";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import MyBreadcrumbs from "../Breadcrumbs/MyBreadcrumbs";
import BanNhapCVDi from "./BanNhapCVDi";
import DuThaoVanBanDi from "./DuThaoVanBanDi";
import PhatHanhVanBanDi from "./PhatHanhVanBanDi";
import MainXuLyCVDi from "./Tabs/MainXuLyCVDi";
import XuLiVanBanDi from "./XuLiVanBanDi";

interface Props {}

export default function CVdi() {
    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return token ? (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundImage:
                        "linear-gradient(0deg,rgb(255,255,255),rgb(224,119,229))",
                    padding: "0 40px 16px 40px",
                }}
            >
                <div
                    style={{
                        margin: "24px 0 0 40px",
                        fontSize: "36px",
                        fontWeight: "bold",
                        color: "#990599",
                        fontFamily: "coiny",
                    }}
                >
                    QUẢN LÝ CÔNG VĂN ĐI
                </div>
                <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="right"
                    mt={3}
                >
                    <Link
                        to="/home"
                        style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "black",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ cursor: "pointer" }}
                        >
                            <div>
                                <img
                                    src="/home-svgrepo-com.svg"
                                    alt=""
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                    }}
                                />
                            </div>
                            <p>Trang Chủ</p>
                        </Stack>
                    </Link>
                    <div
                        style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "black",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ cursor: "pointer" }}
                            id="fade-button"
                            aria-controls={open ? "fade-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <img
                                src="/add-svgrepo-com.svg"
                                alt=""
                                style={{
                                    width: "20px",
                                    height: "20px",
                                }}
                            />
                            <p>Dự thảo văn bản</p>
                        </Stack>

                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                "aria-labelledby": "fade-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem
                                onClick={() => {
                                    setAnchorEl(null);
                                    // navigate("./duthaovanbandi");
                                    window.location.href = "/quanlycongvandi/duthaovanbandi"
                                }}
                            >
                                Thêm dự thảo
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setAnchorEl(null);
                                    navigate("./duthaovanbannhap");
                                }}
                            >
                                Dự thảo nháp
                            </MenuItem>
                        </Menu>
                    </div>

                    <Link
                        to="xulivanbandi"
                        style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "black",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ cursor: "pointer" }}
                        >
                            <div>
                                <img
                                    src="/process-svgrepo-com.svg"
                                    alt=""
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                    }}
                                />
                            </div>
                            <p>Xử lí văn bản đi</p>
                        </Stack>
                    </Link>
                    {/*  */}
                    {/* <Stack
                direction="row"
                spacing={1}
                sx={{ cursor: "pointer" }}
            >
                <div>
                    <img
                        src="/process-svgrepo-com.svg"
                        alt=""
                        style={{ width: "20px", height: "20px" }}
                    />
                </div>
                <p>Xử lí văn bản đi</p>
            </Stack> */}

                    <Link
                        to="phathanhvanbandi"
                        style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "black",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ cursor: "pointer" }}
                        >
                            <div>
                                <img
                                    src="/send-svgrepo-com.svg"
                                    alt=""
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                    }}
                                />
                            </div>
                            <p>Phát hành văn bản đi</p>
                        </Stack>
                    </Link>
                </Stack>
            </div>

            <div>
                <MyBreadcrumbs color="#990599"></MyBreadcrumbs>
            </div>

            <Stack style={{ margin: "0 60px 0 80px" }}>
                <Routes>
                    <Route
                        path="/duthaovanbandi/"
                        element={<DuThaoVanBanDi />}
                    ></Route>
                    <Route
                        path="/duthaovanbandi/:iddraft"
                        element={<DuThaoVanBanDi />}
                    ></Route>
                    <Route
                        path="/xulivanbandi"
                        element={<XuLiVanBanDi />}
                    ></Route>
                    <Route
                        path="/phathanhvanbandi"
                        element={<PhatHanhVanBanDi />}
                    ></Route>
                    <Route
                        path="/xulivanbandi/:mavbdi"
                        element={<MainXuLyCVDi />}
                    ></Route>
                    <Route
                        path="/duthaovanbannhap"
                        element={<BanNhapCVDi />}
                    ></Route>
                </Routes>
            </Stack>
        </div>
    ) : (
        <></>
    );
}
