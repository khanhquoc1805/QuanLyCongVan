import { Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface Props {}

export default function CVdi() {
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
                                src="home-svgrepo-com.svg"
                                alt=""
                                style={{ width: "20px", height: "20px" }}
                            />
                        </div>
                        <p>Trang Chủ</p>
                    </Stack>
                </Link>
                <Stack direction="row" spacing={1} sx={{ cursor: "pointer" }}>
                    <div>
                        <img
                            src="add-svgrepo-com.svg"
                            alt=""
                            style={{ width: "20px", height: "20px" }}
                        />
                    </div>
                    <p>Dự thảo văn bản đi</p>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ cursor: "pointer" }}>
                    <div>
                        <img
                            src="process-svgrepo-com.svg"
                            alt=""
                            style={{ width: "20px", height: "20px" }}
                        />
                    </div>
                    <p>Xử lí văn bản đi</p>
                </Stack>
                
                <Stack direction="row" spacing={1} sx={{ cursor: "pointer" }}>
                    <div>
                        <img
                            src="send-svgrepo-com.svg"
                            alt=""
                            style={{ width: "20px", height: "20px" }}
                        />
                    </div>
                    <p>Phát hành văn bản đi</p>
                </Stack>
                
            </Stack>
        </div>
    );
}
