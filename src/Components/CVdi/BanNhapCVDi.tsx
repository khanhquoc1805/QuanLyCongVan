import DeleteIcon from "@mui/icons-material/Delete";
import DetailsIcon from "@mui/icons-material/Details";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import draftCVDi from "../../API/DraftCVDi";
import { DraftCVDi } from "../../Model/Draft";
import { getMaNVFromToken } from "../../Utils/getValueFormToken";

// function createData(
//     name: string,
//     calories: number,
//     fat: number,
//     carbs: number,
//     protein: number
// ) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//     createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//     createData("Eclair", 262, 16.0, 24, 6.0),
// ];

export default function BanNhapCVDi(): ReactElement {
    const navigate = useNavigate();
    const [dsDraft, setDsDraft] = React.useState<[DraftCVDi]>();
    const [openApproveDialog, setOpenApproveDialog] =
        React.useState<boolean>(false);
    const [iddraft, setIddraft] = React.useState<string>("");
    const manv = getMaNVFromToken()
    useEffect(() => {
        (async () => {
            const response = await draftCVDi.get(manv);
            console.log(response);
            setDsDraft(response);
        })();
    }, []);

    const handleClickDelete = async () => {
        const response = await draftCVDi.delete(iddraft);
        if (response.status === "successfully") {
            setOpenApproveDialog(false);
            const response = await draftCVDi.get(manv);
            setDsDraft(response);
        }
    };
    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Bản nháp dự thảo</h2>
            <TableContainer
                component={Paper}
                sx={{ backgroundColor: "#EAEAEA" }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <caption>
                        Đây là bản nháp đã lưu và có thể chỉnh sửa
                    </caption>
                    <TableHead
                        sx={{
                            backgroundColor: "#004366",
                        }}
                    >
                        <TableRow>
                            <TableCell
                                sx={{ color: "#fff", fontWeight: "bolder" }}
                            >
                                Tiêu đề
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ color: "#fff", fontWeight: "bolder" }}
                            >
                                Loại văn bản
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ color: "#fff", fontWeight: "bolder" }}
                            >
                                Lĩnh vực
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ color: "#fff", fontWeight: "bolder" }}
                            >
                                Đơn vị
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ color: "#fff", fontWeight: "bolder" }}
                            >
                                Hành động
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dsDraft?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row?.data.trichyeu || "chưa có tiêu đề"}
                                </TableCell>
                                <TableCell align="right">
                                    {row?.loaicv}
                                </TableCell>
                                <TableCell align="right">{row?.lv}</TableCell>
                                <TableCell align="right">
                                    {row?.donvi}
                                </TableCell>
                                <TableCell align="right">
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "24px",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <DetailsIcon
                                            sx={{
                                                color: "blue",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                navigate(
                                                    `/quanlycongvandi/duthaocongvandi/${row.data.iddraft}`
                                                );
                                            }}
                                        ></DetailsIcon>
                                        <DeleteIcon
                                            sx={{
                                                color: "red",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                setIddraft(row.data.iddraft);
                                                setOpenApproveDialog(true);
                                            }}
                                        ></DeleteIcon>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openApproveDialog}
                // onClose={() => {
                //     setOpenApproveDialog(false);
                // }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Xóa dự thảo nháp
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa bản nháp này!
                        <br /> Thao tác này sẽ không thể hoàn tác và dữ liệu sẽ biến mất!
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
                            handleClickDelete();
                        }}
                        color="secondary"
                        variant="contained"
                        autoFocus
                    >
                        Duyệt
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
