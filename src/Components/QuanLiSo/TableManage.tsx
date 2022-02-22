import React, { ReactElement, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useAppDispatch ,useAppSelector} from "../../App/hooks";
import { soCVActions } from "../../features/SoCV/SoCVSlice";

import {selectDsSoCV} from "../../features/SoCV/SoCVSlice";

interface Props {}

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

function createData(
    name: number,
    calories: string,
    fat: string,
    carbs: string,
    protein: string
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(1, "nd","Nghị Định", "Sổ công văn đi","Phòng kết hoạch - tổng hợp"),
    createData(2, "ct","Chỉ Thị", "Sổ công văn đến",  "Phòng kết hoạch - tổng hợp"),
    createData(3, "svc2021","Nghị Định", "Sổ công văn đi",  "Phòng kết hoạch - tổng hợp"),
    createData(4, "VPDT","Nghị Định", "Sổ công văn đến",  "Phòng kết hoạch - tổng hợp"),
    createData(5, "SVBD","Nghị Định", "Sổ công văn đến",  "Phòng kết hoạch - tổng hợp"),
];

export default function TableManage() {

    const dispatch = useAppDispatch();
    const dssocv = useAppSelector(selectDsSoCV);
    

    useEffect(() => {
        dispatch(soCVActions.fetchData({ page: 1, limit: 5 }));
    }, [dispatch]);

    console.log(dssocv);
    return (
        <TableContainer component={Paper} sx={{marginTop: '32px', maxWidth:"100%"}}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{maxWidth: "20px"}}>
                            STT
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Mã Sổ Công Văn
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Tên Sổ Công Văn
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Nhóm Công Văn
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Đơn Vị
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            Sửa
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            Xóa
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
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
                            <StyledTableCell align="center">
                                {row.protein}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <img src="note-svgrepo-com.svg" alt="" style={{width: "24px", height:"24px", cursor:"pointer"}}/>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <img src="cancel-svgrepo-com.svg" alt="" style={{width: "24px", height:"24px", cursor:"pointer"}}/>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
