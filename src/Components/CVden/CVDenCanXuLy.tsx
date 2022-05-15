import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    OutlinedInput,
    Stack,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import cvDenApi from "../../API/CVDen";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
    cvDenActions,
    selectDsCVden,
    selectFilter,
    selectPagination,
} from "../../features/CVDen/CVDenSlice";
import { getDateFromString } from "../../Utils/getDateFromString";
import { getDonViFromToken } from "../../Utils/getValueFormToken";
import PreviewDialog from "../PreviewDialog/PreviewDialog";

interface Props {}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#673ab7",
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

export default function CVDenCanXuLy() {
    const searchRef = useRef<HTMLInputElement>();
    const [openPreview, setOpenPreview] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");

    const dispatch = useAppDispatch();
    const pagination = useAppSelector(selectPagination);
    const filter = useAppSelector(selectFilter);
    const dscvden = useAppSelector(selectDsCVden);
    const [openApproveDialog, setOpenApproveDialog] = useState<boolean>(false);
    const [maCvDen, setMaCvDen] = useState<number>(0);

    useEffect(() => {
        (() => {
            dispatch(cvDenActions.fetchData(filter));
        })();
    }, [dispatch, filter]);
    console.log(filter);

    useEffect(() => {
        dispatch(
            cvDenActions.setFilter({
                ...filter,
                madv: getDonViFromToken(),
            })
        );
    }, []);

    const handleChange = (e: any, page: number) => {
        dispatch(
            cvDenActions.setFilter({
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
        dispatch(cvDenActions.setFilterWithDebounce(newFilter));
    };

    const handleApproveConfirm = async () => {
        try {
            const response = await cvDenApi.delete(maCvDen);
            setOpenApproveDialog(false);
            if (pagination.totalRows % pagination.limit === 1) {
                dispatch(
                    cvDenActions.setFilter({
                        ...filter,
                        page: pagination.page - 1,
                    })
                );
            } else {
                dispatch(
                    cvDenActions.setFilter({
                        ...filter,
                    })
                );
            }
        } catch (error) {}
    };

    console.log(dscvden);
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
                        Search By Name
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
                        {dscvden?.map(
                            (row, index) =>
                                row.cvden.macvden !== 0 && (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                            sx={{ maxWidth: "20px" }}
                                        ></StyledTableCell>
                                        <StyledTableCell align="center">
                                            {getDateFromString(
                                                row.cvden.ngaycvden as Date
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.cvden.soden}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row.cvden.coquanbanhanh}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            sx={{ maxWidth: "120px" }}
                                        >
                                            {" "}
                                            {getDateFromString(
                                                row.cvden.ngaybanhanh as Date
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="left"
                                            sx={{ maxWidth: "20px" }}
                                        >
                                            {row.cvden.tencvden}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {row.linhvuc.tenlv}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <span style={{ color: "red" }}>
                                                {
                                                    row.cvden.nguoiky?.split(
                                                        "/"
                                                    )[0]
                                                }
                                            </span>
                                            <br />
                                            <span style={{ color: "blue" }}>
                                                {
                                                    row.cvden.nguoiky?.split(
                                                        "/"
                                                    )[1]
                                                }
                                            </span>
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
                                                        setOpenPreview(true);
                                                        setUrl(
                                                            row.ttbosung.dinhkem
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
                                                <Link
                                                    to={`${row.cvden.macvden}`}
                                                    style={{
                                                        textDecoration: "none",
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
                                                        onClick={() => {
                                                            setMaCvDen(
                                                                row.cvden
                                                                    .macvden
                                                            );
                                                            setOpenApproveDialog(
                                                                true
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </Stack>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack direction="row" justifyContent="center" mt={3}>
                <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={Math.ceil(pagination.totalRows / pagination.limit)}
                    page={pagination.page}
                    onChange={handleChange}
                />
            </Stack>
            <PreviewDialog
                open={openPreview}
                url={url}
                setOpen={setOpenPreview}
            />

            <Dialog
                open={openApproveDialog}
                onClose={() => {
                    setOpenApproveDialog(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Xóa văn bản đến
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa văn bản này!
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
                            handleApproveConfirm();
                        }}
                        color="secondary"
                        variant="contained"
                        autoFocus
                    >
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
