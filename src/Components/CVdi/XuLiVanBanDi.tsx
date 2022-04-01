import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
    cvDiActions,
    selectDsCVDi,
    selectFilter,
    selectPagination,
} from "../../features/CVDi/CVDiSlice";
import { getDateFromString } from "../../Utils/getDateFromString";
import { getColorProcess, getProcessState } from "../../Utils/getProcessState";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
} from "@mui/material";
import cvDiApi from "../../API/CVdi";
import { toast } from "react-toastify";
import PreviewDialog from "../PreviewDialog/PreviewDialog";
import NhanVienAPI from "../../API/NhanVien";
import { getDonViFromToken } from "../../Utils/getValueFormToken";
import { Link } from "react-router-dom";

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
    const [openApproveDialog, setOpenApproveDialog] = useState<boolean>(false);
    const [mavbdi, setMavbdi] = useState<number>(0);
    const [openPreview, setOpenPreview] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        (() => {
            dispatch(cvDiActions.fetchData(filter));
        })();
    }, [dispatch, filter]);

    console.log(dscvdi);

    const handleChange = (e: any, page: number) => {
        dispatch(
            cvDiActions.setFilter({
                ...filter,
                page: page,
            })
        );
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFilter = {
            ...filter,
            textSearch: e.target.value,
        };
        dispatch(cvDiActions.setFilterWithDebounce(newFilter));
    };

    const handleApproveConfirm = async (mavbdi: number) => {
        try {
            const response = await cvDiApi.xulytt(mavbdi);
            if (response.status === "successfully") {
                toast.success("Approve SuccessFully!", {
                    position: "top-center",
                    autoClose: 2000,
                });
                dispatch(cvDiActions.setFilter({ ...filter }));
            }
            setOpenApproveDialog(false);
        } catch (error) {}
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
                        onChange={handleSearchChange}
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
                        {dscvdi.length > 0 &&
                            dscvdi?.map(
                                (row, index) =>
                                    row.cvdi.ttxuly === "chuaxuly" &&
                                    row.donvi.madv === getDonViFromToken() && (
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
                                                {row.donvi.tendv}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="left"
                                                sx={{ maxWidth: "120px" }}
                                            >
                                                {row.loaicv.tenloai}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="left"
                                                sx={{ maxWidth: "200px" }}
                                            >
                                                {row.cvdi.tenvbdi}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {row.linhvuc.tenlv}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Box
                                                    color={getColorProcess(
                                                        row.cvdi.ttxuly
                                                    )}
                                                >
                                                    {getProcessState(
                                                        row.cvdi.ttxuly
                                                    )}
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
                                                        onClick={() => {
                                                            setOpenPreview(
                                                                true
                                                            );
                                                            setUrl(
                                                                row.ttbosung
                                                                    .dinhkem
                                                            );
                                                        }}
                                                    />
                                                </Stack>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-evenly"
                                                >
                                                    {" "}
                                                    <div>
                                                        <img
                                                            onClick={() => {
                                                                setMavbdi(
                                                                    row.cvdi
                                                                        .mavbdi
                                                                );
                                                                setOpenApproveDialog(
                                                                    true
                                                                );
                                                            }}
                                                            src="/forward-svgrepo-com.svg"
                                                            alt=""
                                                            style={{
                                                                width: "24px",
                                                                height: "24px",
                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                    </div>
                                                    <Link
                                                        to={`${row.cvdi.mavbdi}`}
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                            cursor: "pointer",
                                                            color: "black",
                                                        }}
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            spacing={1}
                                                            sx={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <img
                                                                src="/process-svgrepo-com.svg"
                                                                alt=""
                                                                style={{
                                                                    width: "24px",
                                                                    height: "24px",
                                                                    cursor: "pointer",
                                                                }}
                                                            />
                                                        </Stack>
                                                    </Link>
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
                                    )
                            )}
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

            <Dialog
                open={openApproveDialog}
                // onClose={() => {
                //     setOpenApproveDialog(false);
                // }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Duyệt văn bản đi
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn duyệt văn bản này!
                        <br /> Thao tác này sẽ không thể hoàn tác nếu bạn đã
                        chấp thuận!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenApproveDialog(false);
                        }}
                        color="primary"
                        variant="outlined"
                    >
                        Đóng
                    </Button>
                    <Button
                        onClick={() => {
                            handleApproveConfirm(mavbdi);
                        }}
                        color="secondary"
                        variant="contained"
                        autoFocus
                    >
                        Duyệt
                    </Button>
                </DialogActions>
            </Dialog>
            <PreviewDialog
                open={openPreview}
                url={url}
                setOpen={setOpenPreview}
            />
        </div>
    );
}
