import { Stack } from "@mui/material";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CVCungHeThong from "./CVCungHeThong";
import CVDenCanXuLy from "./CVDenCanXuLy";
import CVDenVaoSo from "./CVDenVaoSo";
import TiepNhanCVDen from "./TiepNhanCVDen";
import XuLyVanBanDen from "./XuLyVanBanDen";

export default function CVden() {
    const token = localStorage.getItem("access_token");
    return token ? (
        <div style={{ margin: "0 40px 0 40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                    style={{
                        margin: "24px 0 0 40px",
                        fontSize: "36px",
                        fontWeight: "bold",
                        color: "#236E08",
                        fontFamily: "coiny",
                    }}
                >
                    QUẢN LÝ CÔNG VĂN ĐẾN
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
                                    style={{ width: "20px", height: "20px" }}
                                />
                            </div>
                            <p>Trang Chủ</p>
                        </Stack>
                    </Link>
                    <Link
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
                    </Link>

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
                                    style={{ width: "20px", height: "20px" }}
                                />
                            </div>
                            <p>Văn bản cùng hệ thống</p>
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
                                    style={{ width: "20px", height: "20px" }}
                                />
                            </div>
                            <p>Văn bản cần xử lý</p>
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
                                    style={{ width: "20px", height: "20px" }}
                                />
                            </div>
                            <p>Văn bản đã vào sổ</p>
                        </Stack>
                    </Link>
                </Stack>
            </div>

            <Stack>
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
                        path="/vanbancanxuly/:macvden"
                        element={<XuLyVanBanDen />}
                    ></Route>
                </Routes>
            </Stack>

            {/* <TableCV></TableCV> */}
        </div>
    ) : (
        <></>
    );
}
