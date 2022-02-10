import React, { ReactElement } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

interface Props {}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.success.dark,
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

function createData(
    name: string,
    calories: string,
    fat: string,
    carbs: string,
    protein: string,
    date: string
) {
    return { name, calories, fat, carbs, protein,date };
}

const rows = [
    createData(
        "Chỉ thị về đổi mới quản lý giáo dục đại học giai đoạn 2020-2022",
        "28/02/2020",
        "Trường Đại học Cần Thơ",
        "",
        "Đơn vị chuyển: Trường Đại học Cần Thơ",
        "Văn thư 22/3/2020 08:55:23"
    ),
    createData(
        "",
        "ct",
        "Chỉ Thị",
        "Sổ công văn đến",
        "Phòng kết hoạch - tổng hợp",
        ""
    ),
    createData(
        "",
        "svc2021",
        "Nghị Định",
        "Sổ công văn đi",
        "Phòng kết hoạch - tổng hợp",
        ""
    ),
    createData(
        "",
        "VPDT",
        "Nghị Định",
        "Sổ công văn đến",
        "Phòng kết hoạch - tổng hợp",
        ""
    ),
    createData(
        "",
        "SVBD",
        "Nghị Định",
        "Sổ công văn đến",
        "Phòng kết hoạch - tổng hợp",
        ""
    ),
];

export default function TableCV() {
    return (
        <TableContainer
            component={Paper}
            sx={{ marginTop: "100px", maxWidth: "100%" }}
        >
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell
                            sx={{ maxWidth: "200px" }}
                            align="center"
                        >
                            Trích yếu
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Ngày ban hành
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Đơn vị tiếp nhận
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Người ký
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Đơn vị chuyển / Nội dung
                        </StyledTableCell>
                        <StyledTableCell align="right" sx={{ maxWidth: "60px" }}>
                            Ngày chuyển
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            Trạng Thái
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell
                                component="th"
                                scope="row"
                                sx={{ maxWidth: "200px" }}
                            >
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.calories}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.fat}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.carbs}
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ maxWidth: "120px" }}
                            >
                                {row.protein}
                            </StyledTableCell>
                            <StyledTableCell align="right" sx={{ maxWidth: "20px" }}>
                                {row.date}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <img
                                    src="cancel-svgrepo-com.svg"
                                    alt=""
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        cursor: "pointer",
                                    }}
                                />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
