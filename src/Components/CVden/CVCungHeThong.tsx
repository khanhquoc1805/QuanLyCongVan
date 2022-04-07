import React, { ReactElement, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { cvDenActions, selectFilter } from "../../features/CVDen/CVDenSlice";
import { selectDsCVden } from "../../features/CVDen/CVDenSlice";
import { convertLength } from "@mui/material/styles/cssUtils";
import { getDonViFromToken } from "../../Utils/getValueFormToken";
import { Stack } from "@mui/material";
import PreviewDialog from "../PreviewDialog/PreviewDialog";

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

export default function CVCungHeThong() {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectFilter);
    const dsCVDen = useAppSelector(selectDsCVden);
    const madv = getDonViFromToken();
    const [openPreview, setOpenPreview] = React.useState<boolean>(false);
    const [url, setUrl] = React.useState<string>("");
    useEffect(() => {
        dispatch(
            cvDenActions.fetchData({
                ...filter,
                status: "chotiepnhan",
                madv: madv,
            })
        );
    }, [dispatch]);
    console.log(dsCVDen);
    return (
        <>
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
                            <StyledTableCell
                                align="right"
                                sx={{ maxWidth: "60px" }}
                            >
                                Ngày chuyển
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Tập tin
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Không tiếp nhận
                            </StyledTableCell>
                            <StyledTableCell align="right">xóa</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dsCVDen?.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    sx={{ maxWidth: "200px" }}
                                >
                                    {row.cvden.tencvden}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.cvden.ngaybanhanh}
                                </StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{ maxWidth: "120px" }}
                                >
                                    {row.cvden.coquanbanhanh}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="right"
                                    sx={{ maxWidth: "20px" }}
                                >
                                    {row.cvden.ngaycvden}
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
                                                setUrl(row.ttbosung.dinhkem);
                                            }}
                                        />
                                    </Stack>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img
                                        src="/forward-svgrepo-com.svg"
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
                                        src="/cancel-svgrepo-com.svg"
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
            <PreviewDialog
                open={openPreview}
                url={url}
                setOpen={setOpenPreview}
            />
        </>
    );
}
