import {
    FormControl,
    InputLabel,
    OutlinedInput,
    Pagination,
    Select,
    Stack,
} from "@mui/material";
import React, { useRef, useEffect, ChangeEvent } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
    selectDsTraCuu,
    selectFilterTraCuu,
    selectPaginationTraCuu,
    traCuuActions,
} from "../../features/TraCuu/TraCuuSlice";
import { getDateFromString } from "../../Utils/getDateFromString";
import PreviewDialog from "../PreviewDialog/PreviewDialog";
import DuThaoVanBanDi from "../CVdi/DuThaoVanBanDi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#039be5",
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

// const monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const monthOptions = Array(12)
    .fill(0)
    .map((_, index) => index + 1);
const yearOptions = Array(11)
    .fill(0)
    .map((_, index) => index + new Date().getFullYear() - 10);
// const yearOptions = [
//     2010, 2011, 2012, 2013, 2014, 2015, 2015, 2016, 2017, 2018, 2019, 2020,
//     2021, 2022,
// ];

export default function MainTraCuu() {
    const token = localStorage.getItem("access_token");
    const dispatch = useAppDispatch();
    const dataTC = useAppSelector(selectDsTraCuu);
    const pagination = useAppSelector(selectPaginationTraCuu);
    const filter = useAppSelector(selectFilterTraCuu);
    const searchRef = useRef<HTMLInputElement>();
    const [openPreview, setOpenPreview] = React.useState<boolean>(false);
    const [url, setUrl] = React.useState<string>("");
    const [month, setMonth] = React.useState<string>("");
    const [year, setYear] = React.useState<string>("");
    const [loaiVB, setLoaiVB] = React.useState<string>("cvden");

    useEffect(() => {
        dispatch(traCuuActions.fetchData(filter));
    }, [dispatch, filter]);
    console.log(dataTC);

    const handleChangePagination = (e: any, page: number) => {
        dispatch(
            traCuuActions.setFilter({
                ...filter,
                page: page,
            })
        );
    };

    const handleChangeLoaiVB = (event: SelectChangeEvent) => {
        setLoaiVB(event.target.value);
        dispatch(
            traCuuActions.setFilter({
                ...filter,
                loaicv: event.target.value,
            })
        );
    };

    const handleChangeMonth = (event: SelectChangeEvent) => {
        setMonth(event.target.value);
        dispatch(
            traCuuActions.setFilter({
                ...filter,
                month: event.target.value,
            })
        );
    };

    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(event.target.value);
        dispatch(
            traCuuActions.setFilter({
                ...filter,
                year: event.target.value,
            })
        );
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFilter = {
            ...filter,
            textSearch: e.target.value,
        };
        dispatch(traCuuActions.setFilterWithDebounce(newFilter));
    };

    return token ? (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundImage: "linear-gradient(0deg,#ffffff,#81d4fa)",
                    padding: "0 40px 16px 40px",
                }}
            >
                <div
                    style={{
                        margin: "24px 0 0 40px",
                        fontSize: "36px",
                        fontWeight: "bold",
                        color: "#01579b",
                        fontFamily: "coiny",
                    }}
                >
                    QUẢN LÝ LƯU TRỮ
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
                                    src="home-svgrepo-com.svg"
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
                </Stack>
            </div>
            <div style={{ margin: "0px 40px 0px 80px" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "24px",
                            color: "#01579b",
                            fontWeight: "bolder",
                        }}
                    >
                        TRA CỨU VÀ TÌM KIẾM
                    </p>
                </div>

                <div>
                    <Stack mt={4} mb={3} spacing={2} direction="row">
                        <FormControl
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={{ width: "500px" }}
                        >
                            <InputLabel htmlFor="timkiem">Tìm kiếm</InputLabel>
                            <OutlinedInput
                                label="Tìm kiếm"
                                id="timkiem"
                                //   endAdornment={<SearchIcon />}
                                onChange={handleSearchChange}
                                inputRef={searchRef}
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                            <InputLabel id="demo-select-small">
                                Loại công văn
                            </InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={loaiVB}
                                label="Loại công văn"
                                onChange={handleChangeLoaiVB}
                            >
                                <MenuItem value="cvden">Công văn đến</MenuItem>
                                <MenuItem value="cvdi">Công văn đi</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small">
                                Tháng
                            </InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={month}
                                label="Tháng"
                                onChange={handleChangeMonth}
                            >
                                {monthOptions.map((month) => (
                                    <MenuItem key={month} value={month}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small">Năm</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={year}
                                label="Năm"
                                onChange={handleChangeYear}
                            >
                                {yearOptions.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </div>

                <TableContainer
                    component={Paper}
                    sx={{ marginTop: "32px", maxWidth: "100%" }}
                >
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{ maxWidth: "20px" }}>
                                    STT
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Trích Yếu
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Cơ Quan Ban Hành
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Lĩnh Vực
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Loại Văn Bản
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Ngày Đi/Đến
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Hành động
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataTC.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.phanloai === "cvden"
                                            ? row.data?.tencvden
                                            : row.data?.tenvbdi}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.data?.coquanbanhanh ||
                                            row.donvi?.tendv}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.linhvuc.tenlv}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.loaicv.tenloai}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.phanloai === "cvden"
                                            ? getDateFromString(
                                                  row.data.ngaycvden as Date
                                              )
                                            : getDateFromString(
                                                  row.data.ngayvbdi as Date
                                              )}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
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
                                                onClick={() => {
                                                    setOpenPreview(true);
                                                    setUrl(
                                                        row.ttbosung.dinhkem
                                                    );
                                                }}
                                            />
                                        </Stack>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack justifyContent="center" mt={5} direction="row">
                    <Pagination
                        variant="outlined"
                        color="secondary"
                        count={Math.ceil(
                            pagination.totalRows / pagination.limit
                        )}
                        page={pagination.page}
                        onChange={handleChangePagination}
                    />
                </Stack>
                <PreviewDialog
                    open={openPreview}
                    url={url}
                    setOpen={setOpenPreview}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to="/truyenthong">Truyền thống</Link>
                <Link to="/elastic">Elastic</Link>

               
            </div>
        </div>
    ) : (
        <></>
    );
}
