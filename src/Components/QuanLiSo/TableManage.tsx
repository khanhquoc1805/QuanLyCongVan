import React, { ReactElement, useEffect, useState } from "react";
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
    selectPagination,
    selectSoCVFilter,
    soCVActions,
} from "../../features/SoCV/SoCVSlice";
import Pagination from "@mui/material/Pagination";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
} from "@mui/material";

import { selectDsSoCV } from "../../features/SoCV/SoCVSlice";
import soCVApi from "../../API/SoCV";
import { toast } from "react-toastify";

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

export default function TableManage() {
    const dispatch = useAppDispatch();
    const dssocv = useAppSelector(selectDsSoCV);
    const pagination = useAppSelector(selectPagination);
    const filter = useAppSelector(selectSoCVFilter);

    const [open, setOpen] = useState<boolean>(false);
    const [masocv, setMasocv] = useState<string>("");

    useEffect(() => {
        dispatch(soCVActions.fetchData(filter));
    }, [dispatch, filter]);

    const handleChange = (e: any, page: number) => {
        dispatch(
            soCVActions.setFilter({
                ...filter,
                page: page,
            })
        );
    };
    const handleRemoveConfirm = async (masocv: string) => {
        try {
            const res = await soCVApi.deleteSoCV(masocv);
            if (res.status === "success") {
                toast.success("Remove SuccessFully!", {
                    position: "top-center",
                    autoClose: 2000,
                });
                dispatch(soCVActions.setFilter({ ...filter }));
            }
            setOpen(false);
        } catch (error) {}
    };

    return (
        <div>
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
                            <StyledTableCell align="right">Sửa</StyledTableCell>
                            <StyledTableCell align="right">Xóa</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dssocv.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {index}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.masocv}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.tensocv}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.nhomsocv}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.donvi}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <img
                                        src="note-svgrepo-com.svg"
                                        alt=""
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                            cursor: "pointer",
                                        }}
                                    />
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
                                        onClick={() => {
                                            setMasocv(row.masocv);
                                            setOpen(true);
                                            //console.log(masocv);
                                        }}
                                    />
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
                    count={Math.ceil(pagination.totalRows / pagination.limit)}
                    page={pagination.page}
                    onChange={handleChange}
                />
            </Stack>

            <Dialog
                open={open}
                // onClose={handleClose}
                // aria-labelledby="alert-dialog-title"
                // aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xóa Sổ Công Văn</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa sổ công văn
                        <br /> Hành động này sẽ làm mất dữ liệu liên qua vĩnh
                        viễn và không thể quay lại!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        autoFocus
                        onClick={() => handleRemoveConfirm(masocv)}
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
