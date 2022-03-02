import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useRef, useState } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    Stack,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
    cvDiActions,
    selectDsCVDi,
    selectFilter,
    selectPagination,
} from "../../features/CVDi/CVDiSlice";
import { getDateFromString } from "../../Utils/getDateFromString";
import { getProcessState, getColorProcess } from "../../Utils/getProcessState";
import linhVucApi, { AddLinhVuc, ILinhVuc } from "../../API/LinhVuc";
import loaiCVApi, { ILoaiCV } from "../../API/LoaiCV";
import donViApi, { IDonVi } from "../../API/DonVi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function XuLiVanBanDi() {
    const searchRef = useRef<HTMLInputElement>();
    const dispatch = useAppDispatch();
    const pagination = useAppSelector(selectPagination);
    const filter = useAppSelector(selectFilter);
    const dscvdi = useAppSelector(selectDsCVDi);

    const [linhVuc, setLinhVuc] = useState<[ILinhVuc]>([
        { malv: 1, tenlv: "" },
    ]);
    const [loaiCV, setLoaiCV] = useState<[ILoaiCV]>([
        { maloai: 1, tenloai: "" },
    ]);

    const [donVi, setDonVi] = useState<[IDonVi]>([{ madv: 1, tendv: "" }]);

    useEffect(() => {
        (async () => {
            const linhvuc = await linhVucApi.getLinhVuc();
            setLinhVuc(linhvuc);
            const loaicv = await loaiCVApi.getLoaiCV();
            setLoaiCV(loaicv);
            const donvi = await donViApi.getDonVi();
            setDonVi(donvi);
        })();
    }, []);


    useEffect(() => {
        (() => {
            dispatch(cvDiActions.fetchData(filter));
        })();
    }, [dispatch, filter]);

    
    //console.log(linhVuc);
    const handleChange = (e: any, page: number) => {
        dispatch(
            cvDiActions.setFilter({
                ...filter,
                page: page,
            })
        );
    };
    return (
        <div>
            <Stack mt={4} mb={3} direction="row" spacing={2}>
                <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ width: "500px" }}
                >
                    <InputLabel htmlFor="searchByName">
                        Tìm kiếm công văn
                    </InputLabel>
                    <OutlinedInput
                        label="Search By Name"
                        id="searchByName"
                        //   endAdornment={<SearchIcon />}
                        //   onChange={handleSearchChange}
                        inputRef={searchRef}
                    />
                </FormControl>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ width: "140px" }}
                >
                    Tìm Kiếm
                </Button>
            </Stack>
            <TableContainer
                component={Paper}
                sx={{ marginTop: "10px", maxWidth: "100%" }}
            >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell
                                sx={{ Width: "20px" }}
                                align="center"
                            >
                                *
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Ngày Đi
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ maxWidth: "24px" }}
                            >
                                Ngày ra công văn
                            </StyledTableCell>
                            <StyledTableCell
                                align="left"
                                sx={{ maxWidth: "80px" }}
                            >
                                Cơ quan ban hành
                            </StyledTableCell>
                            <StyledTableCell
                                align="left"
                                sx={{ maxWidth: "40px" }}
                            >
                                Loại công văn
                            </StyledTableCell>
                            <StyledTableCell
                                align="left"
                                sx={{ maxWidth: "200px" }}
                            >
                                Số, Kí hiệu và trích yếu
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                Lĩnh Vực
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                Xử lý
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Tập tin
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ Width: "40px" }}
                            >
                                Thao tác
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dscvdi.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    sx={{ maxWidth: "20px" }}
                                ></StyledTableCell>
                                <StyledTableCell align="center">
                                    {getDateFromString(
                                        row.cvdi?.ngayvbdi as Date
                                    )}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {getDateFromString(
                                        row.cvdi?.ngayravbdi as Date
                                    )}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {/* {
                                        donVi.filter(
                                            (x) => x.madv === row.cvdi.madv
                                        )[0].tendv
                                    } */}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{ maxWidth: "120px" }}
                                ></StyledTableCell>
                                <StyledTableCell
                                    align="left"
                                    sx={{ maxWidth: "20px" }}
                                >
                                    {" "}
                                    {row.cvdi.tenvbdi}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {/* {
                                        linhVuc?.filter(
                                            (x) => x.malv === row.cvdi.malv
                                        )[0].tenlv
                                    } */}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Box
                                        color={getColorProcess(row.cvdi.ttxuly)}
                                    >
                                        {getProcessState(row.cvdi.ttxuly)}
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Stack
                                        direction="row"
                                        justifyContent="space-evenly"
                                    >
                                        <img
                                            src="/download-svgrepo-com.svg"
                                            alt=""
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <img
                                            src="/eye-svgrepo-com.svg"
                                            alt=""
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </Stack>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Stack
                                        direction="row"
                                        justifyContent="space-evenly"
                                    >
                                        <img
                                            src="/forward-svgrepo-com.svg"
                                            alt=""
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <img
                                            src="/medical-records-svgrepo-com.svg"
                                            alt=""
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </Stack>
                                    <div
                                        style={{
                                            textAlign: "center",
                                            marginTop: "4px",
                                        }}
                                    >
                                        <img
                                            src="/delete-svgrepo-com.svg"
                                            alt=""
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack direction="row" justifyContent="center" mt={3}>
                <Pagination
                    count={Math.ceil(pagination.totalRows / pagination.limit)}
                    page={pagination.page}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </div>
    );
}
