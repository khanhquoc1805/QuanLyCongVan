import { Stack } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import TableCV from "./TableCV";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableVaoSo from "./TableVaoSo";

export default function CVden() {
    return (
        <div style={{ margin: "0 40px 0 40px" }}>
            <Stack direction="row" spacing={3} justifyContent="right" mt={3}>
                <Link
                    to="/"
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
                        <div style={{ cursor: "pointer" }}>
                            Tiếp nhận văn bản đến
                        </div>
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
                        <div style={{ cursor: "pointer" }}>Văn bản đã vào sổ</div>
                    </Stack>
                </Link>

               
            </Stack>
            <Stack>
                <Routes>
                    <Route path="/" element={<TableCV />}></Route>
                    <Route
                        path="/vanbandavaoso"
                        element={<TableVaoSo />}
                    ></Route>
                </Routes>
            </Stack>
            {/* <TableCV></TableCV> */}
        </div>
    );
}
