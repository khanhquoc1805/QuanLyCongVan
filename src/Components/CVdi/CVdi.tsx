import { Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import DuThaoVanBanDi from "./DuThaoVanBanDi";
import { Routes, Route } from "react-router-dom";
import XuLiVanBanDi from "./XuLiVanBanDi";
import PhatHanhVanBanDi from "./PhatHanhVanBanDi";
import MainXuLyCVDi from "./Tabs/MainXuLyCVDi";
import MyBreadcrumbs from "../Breadcrumbs/MyBreadcrumbs";

interface Props {}

export default function CVdi() {
    const token = localStorage.getItem("access_token");
    return token ? (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundImage:
                        "linear-gradient(0deg,rgb(255,255,255),rgb(224,119,229))",
                        padding: "0 40px 16px 40px"
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
                    <Link
                        to="duthaovanbandi"
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
                                    src="/add-svgrepo-com.svg"
                                    alt=""
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                    }}
                                />
                            </div>
                            <p>Dự thảo văn bản đi</p>
                        </Stack>
                    </Link>

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
                        path="/duthaovanbandi"
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
                </Routes>
            </Stack>
        </div>
    ) : (
        <></>
    );
}
