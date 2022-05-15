import { FormControl, InputLabel, OutlinedInput, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
    cvDenActions,
    selectDsCVden,
    selectFilter,
    selectPagination,
} from "../../features/CVDen/CVDenSlice";
import Pagination from "@mui/material/Pagination";
import { getDateFromString } from "../../Utils/getDateFromString";
import PreviewDialog from "../PreviewDialog/PreviewDialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#78909c",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
        height: "48px",
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

export default function CVDenVaoSo() {
    const searchRef = useRef<HTMLInputElement>();
    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectFilter);
    const pagination = useAppSelector(selectPagination);
    const dscvden = useAppSelector(selectDsCVden);
    const [openPreview, setOpenPreview] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        (() => {
            dispatch(
                cvDenActions.fetchData({
                    ...filter,
                    status: "hoanthanhxuly",
                    limit: 5,
                })
            );
        })();
    }, [dispatch, filter]);

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
    console.log(dscvden);
    return (
        <>
            <Stack mt={4} mb={3} direction="row-reverse" spacing={2}>
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
            </Stack>
            <TableContainer component={Paper} sx={{ marginTop: "16px" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>STT</StyledTableCell>
                            <StyledTableCell align="left">
                                Trích yếu
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                Cơ quan ban hành
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Lĩnh vực
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Loại văn bản
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Ngày ban hành
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Ngày vào sổ
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Bút phê
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Tập tin
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dscvden.map(
                            (row, index) =>
                                row.cvden.macvden !== 0 && (
                                    <StyledTableRow>
                                        <StyledTableCell>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {" "}
                                            {row.cvden.tencvden}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {" "}
                                            {row.cvden.coquanbanhanh}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {" "}
                                            {row.linhvuc.tenlv}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {" "}
                                            {row.loaicv.tenloai}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {" "}
                                            {getDateFromString(
                                                row.cvden.ngaybanhanh as Date
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {getDateFromString(
                                                row.cvden.ngayvaoso as Date
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="left">
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
                                )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack direction="row" justifyContent="center" mt={3}>
                <Pagination
                    variant="outlined"
                    shape="circular"
                    count={Math.ceil(pagination.totalRows / pagination.limit)}
                    page={pagination.page}
                    onChange={handleChange}
                    color="primary"
                    //showLastButton={true}
                />
            </Stack>
            <PreviewDialog
                open={openPreview}
                url={url}
                setOpen={setOpenPreview}
            />
        </>
    );
}
