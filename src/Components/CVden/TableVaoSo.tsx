import React, { useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    Stack,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

interface Props {}

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

function createData(
    one: string,
    two: number,
    three: string,
    four: string,
    five: string,
    six: string
) {
    return { one, two, three, four, five, six };
}

const rows = [
    createData(
        "4/7/2021",
        11,
        "Chính Phủ",
        "6/4/2019",
        "Nghị định Quy định về xử lí kỷ luật viên chức và trách nhiệm bồi thường, hoàn trả của viên chức.",
        "Nhân sự"
    ),
    createData(
        "4/7/2021",
        11,
        "Chính Phủ",
        "6/4/2019",
        "Nghị định Quy định về xử lí kỷ luật viên chức và trách nhiệm bồi thường, hoàn trả của viên chức.",
        "Nhân sự"
    ),
    createData(
        "4/7/2021",
        11,
        "Chính Phủ",
        "6/4/2019",
        "Nghị định Quy định về xử lí kỷ luật viên chức và trách nhiệm bồi thường, hoàn trả của viên chức.",
        "Nhân sự"
    ),
    createData(
        "4/7/2021",
        11,
        "Chính Phủ",
        "6/4/2019",
        "Nghị định Quy định về xử lí kỷ luật viên chức và trách nhiệm bồi thường, hoàn trả của viên chức.",
        "Nhân sự"
    ),
    createData(
        "4/7/2021",
        11,
        "Chính Phủ",
        "6/4/2019",
        "Nghị định Quy định về xử lí kỷ luật viên chức và trách nhiệm bồi thường, hoàn trả của viên chức.",
        "Nhân sự"
    ),
];

export default function TableVaoSo() {
    const searchRef = useRef<HTMLInputElement>();
    return (
        <div>
            <Stack mt={4} mb={3} direction="row" spacing={2}>
                <FormControl fullWidth variant="outlined" size="small" sx={{ width: "500px" }}>
                    <InputLabel htmlFor="searchByName">
                        Search By Name
                    </InputLabel>
                    <OutlinedInput
                        
                        label="Search By Name"
                        id="searchByName"
                        //   endAdornment={<SearchIcon />}
                        //   onChange={handleSearchChange}
                        inputRef={searchRef}
                    />
                </FormControl>
                <Button variant="outlined" color="secondary" sx={{width: "140px"}}>Tìm Kiếm</Button>
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
                                Ngày đến
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ maxWidth: "24px" }}
                            >
                                Số đến
                            </StyledTableCell>
                            <StyledTableCell
                                align="left"
                                sx={{ maxWidth: "28px" }}
                            >
                                Cơ quan ban hành
                            </StyledTableCell>
                            <StyledTableCell
                                align="left"
                                sx={{ maxWidth: "28px" }}
                            >
                                Ngày Công Văn
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
                                Bút Phê
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
                        {rows.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    sx={{ maxWidth: "20px" }}
                                ></StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.one}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.two}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.three}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{ maxWidth: "120px" }}
                                >
                                    {row.four}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="left"
                                    sx={{ maxWidth: "20px" }}
                                >
                                    {row.five}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.six}
                                </StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
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
                <Pagination count={10} variant="outlined" shape="rounded" />
            </Stack>
        </div>
    );
}
