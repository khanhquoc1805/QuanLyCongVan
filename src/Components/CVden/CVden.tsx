import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TableCV from "./TableCV";
import { Route, Routes } from "react-router-dom";
import TableVaoSo from "./TableVaoSo";
import TiepNhanCVDen from "./TiepNhanCVDen";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { cvDenActions, selectDsCVden } from "../../features/CVDen/CVDenSlice";

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
      <Stack>
        <Routes>
          <Route path="/" element={<TableCV />}></Route>
          <Route
            path="/vanbandavaoso"
            element={<TableVaoSo />}
          >
          </Route>
          <Route
            path="/tiepnhanvanbanden"
            element={<TiepNhanCVDen />}
          >
          </Route>
        </Routes>
      </Stack>
      {/* <TableCV></TableCV> */}
    </div>
  );
}
