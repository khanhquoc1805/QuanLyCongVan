import { Menu, Stack } from "@mui/material";
import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import MyBreadcrumbs from "../Breadcrumbs/MyBreadcrumbs";
import CVCungHeThong from "./CVCungHeThong";
import CVDenCanXuLy from "./CVDenCanXuLy";
import CVDenVaoSo from "./CVDenVaoSo";
import TiepNhanCVDen from "./TiepNhanCVDen";
import XuLyVanBanDen from "./XuLyVanBanDen";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import BanNhapCVDi from "../CVdi/BanNhapCVDi";
import BanNhapCVDen from "./BanNhapCVDen";

export default function CVden() {
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
                        "linear-gradient(0deg,rgb(255,255,255),#b39ddb)",
                    padding: "0 40px 16px 40px",
                }}
            >
                <div
                    style={{
                        margin: "24px 0 0 40px",
                        fontSize: "36px",
                        fontWeight: "bold",
                        color: "#5e35b1",
                        fontFamily: "coiny",
                    }}
                >
                    QUẢN LÝ CÔNG VĂN ĐẾN
                </div>
                <Stack
                    direction="row"
                    spacing={2}
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
                                    style={{ width: "24px", height: "24px" }}
                                />
                            </div>
                            <p style={{fontSize: "18px"}}>Trang Chủ</p>
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
                                    width: "24px",
                                    height: "24px",
                                }}
                            />
                            <p style={{fontSize: "18px"}}>Tiếp nhận văn bản đến</p>
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
                                    //  navigate("./tiepnhanvanbanden");
                                    //  window.location.reload();
                                    window.location.href =
                                        "/quanlycongvanden/tiepnhanvanbanden";
                                }}
                            >
                                Thêm dự thảo
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setAnchorEl(null);
                                    navigate("./tiepnhanvanbannhap");
                                }}
                            >
                                Dự thảo nháp
                            </MenuItem>
                        </Menu>
                    </div>

                    {/* <Link
                        to="tiepnhanvanbanden"
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
                                    src="/input-svgrepo-com.svg"
                                    alt=""
                                    style={{ width: "20px", height: "20px" }}
                                />
                            </div>
                            <p>Tiếp nhận văn bản đến</p>
                        </Stack>
                    </Link> */}

                    <Link
                        to="vanbancunghethong"
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
                                    src="/system-svgrepo-com.svg"
                                    alt=""
                                    style={{ width: "24px", height: "24px" }}
                                />
                            </div>
                            <p style={{fontSize: "18px"}}>Văn bản cùng hệ thống</p>
                        </Stack>
                    </Link>

                    <Link
                        to="vanbancanxuly"
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
                                    src="/reload-svgrepo-com.svg"
                                    alt=""
                                    style={{ width: "24px", height: "24px" }}
                                />
                            </div>
                            <p style={{fontSize: "18px"}}>Văn bản cần xử lý</p>
                        </Stack>
                    </Link>

                    <Link
                        to="vanbandavaoso"
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
                                    src="/all-application-svgrepo-com.svg"
                                    alt=""
                                    style={{ width: "24px", height: "24px" }}
                                />
                            </div>
                            <p style={{fontSize: "18px"}}>Văn bản đã vào sổ</p>
                        </Stack>
                    </Link>
                </Stack>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <MyBreadcrumbs color="#236E08"></MyBreadcrumbs>
            </div>

            <Stack style={{ margin: "0 60px 0 80px" }}>
                <Routes>
                    <Route path="/" element={<CVDenCanXuLy />}></Route>
                    <Route
                        path="/vanbancunghethong"
                        element={<CVCungHeThong />}
                    ></Route>
                    <Route
                        path="/vanbancanxuly"
                        element={<CVDenCanXuLy />}
                    ></Route>
                    <Route
                        path="/vanbandavaoso"
                        element={<CVDenVaoSo />}
                    ></Route>
                    <Route
                        path="/tiepnhanvanbanden"
                        element={<TiepNhanCVDen />}
                    ></Route>
                    <Route
                        path="/tiepnhanvanbanden/:iddraft"
                        element={<TiepNhanCVDen />}
                    ></Route>
                    <Route
                        path="/vanbancanxuly/:macvden"
                        element={<XuLyVanBanDen />}
                    ></Route>
                    <Route
                        path="/tiepnhanvanbannhap"
                        element={<BanNhapCVDen />}
                    ></Route>
                </Routes>
            </Stack>

            {/* <TableCV></TableCV> */}
        </div>
    ) : (
        <></>
    );
}
