import React, { ReactElement, useEffect, useRef,ChangeEvent } from "react";
import {
    FormControl,
    InputLabel,
    LinearProgress,
    OutlinedInput,
    Pagination,
    Select,
    Stack,
} from "@mui/material";
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
    demoActions,
    selectDemo,
    selectFilterDemo,
    selectLoadingDemo,
    selectPaginationDemo,
    selectTimeDemo,
} from "../../features/Demo/TT/TTSlice";
import { Link } from "react-router-dom";

interface Props {}

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

export default function TruyenThong({}: Props): ReactElement {
    const searchRef = useRef<HTMLInputElement>();
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectDemo);
    const pagination = useAppSelector(selectPaginationDemo);
    const filter = useAppSelector(selectFilterDemo);
    const loading = useAppSelector(selectLoadingDemo);
    const time = useAppSelector(selectTimeDemo);

    useEffect(() => {
        dispatch(demoActions.fetchData(filter));
    }, [dispatch, filter]);

    const handleChangePagination = (e: any, page: number) => {
        dispatch(
            demoActions.setFilter({
                ...filter,
                page: page,
            })
        );
    };
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFilter = {
            ...filter,
            page: 1,
            textSearch: e.target.value,
        };
        dispatch(demoActions.setFilterWithDebounce(newFilter));
    };
    console.log(data);

    return (
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
                        DEMO TÌM TÌM KIẾM
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
                                //endAdornment={<SearchIcon />}
                                onChange={handleSearchChange}
                                inputRef={searchRef}
                            />
                        </FormControl>

                        {/* <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
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
                    </FormControl> */}

                        {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">Tháng</InputLabel>
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
                    </FormControl> */}

                        {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
                    </FormControl> */}
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
                                    Đơn vị
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.data.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.data.trichyeu}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.data.coquanbanhanh}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.linhvuc.tenlv}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.loaicv.tenloai}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.donvi.tendv}
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
                <p>Thời gian tải dữ liệu : {time} mili giây.</p>
                <div>{loading && <LinearProgress color="secondary" />}</div>
            </div>
        </div>
    );
}
