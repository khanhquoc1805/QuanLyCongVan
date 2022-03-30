import { Button, Pagination, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
    selectDsUser,
    selectLoadingUser,
    selectPaginationUser,
    selectUserFilter,
    userActions,
} from "../../features/User/UserSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.error.main,
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

export default function HomeUser() {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectUserFilter);
    const pagination = useAppSelector(selectPaginationUser);
    const loading = useAppSelector(selectLoadingUser);
    const dsnv = useAppSelector(selectDsUser);

    useEffect(() => {
        dispatch(userActions.fetchUserList(filter));
    }, [dispatch, filter]);

    const handleChange = (e: any, page: number) => {
        dispatch(
            userActions.setFilter({
                ...filter,
                page: page,
            })
        );
    };

    console.log(dsnv);
    return (
        <div style={{ margin: "0 40px 0 40px" }}>
            <div>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div
                        style={{
                            margin: "24px 0 0 40px",
                            fontSize: "36px",
                            fontWeight: "bold",
                            color: "#F73B07",
                            fontFamily: "coiny",
                        }}
                    >
                        QUẢN LÝ NGƯỜI DÙNG
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
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            position: "absolute",
                            right: "40px",
                            top: "72px",
                        }}
                        // onClick={() => {
                        //     setOpen(true);
                        // }}
                    >
                        Thêm Mới
                    </Button>
                </div>
                <div style={{marginTop: "64px", maxWidth: "50%"}}>
                    <TableContainer
                        component={Paper}
                        sx={{  }}
                    >
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ maxWidth: "20px" }}>
                                        STT
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Mã cán bộ
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Tên cán bộ
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Đơn vị
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Chức vụ
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dsnv.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.nv.manv}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.nv.tennv}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.donvi.tendv}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.bophan.tenbp}
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
                            onChange={handleChange}
                        />
                    </Stack>
                </div>
            </div>
        </div>
    );
}
