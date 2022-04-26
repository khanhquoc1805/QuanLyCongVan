import { Button, Pagination, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import userApi from "../../API/User";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
    selectDsUser,
    selectLoadingUser,
    selectPaginationUser,
    selectUserFilter,
    userActions,
} from "../../features/User/UserSlice";
import { BaseNV } from "../../Model/User";
import { getDefaultBirthDay } from "../../Utils/getCurrentDate";
import AddUserForm from "./AddUserForm";

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

    const [fileUpload, setFileUpload] = React.useState<File>(
        new File([""], "filename")
    );

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
    const initialValue: BaseNV = {
        manv: "",
        email: "",
        tennv: "",
        ngaysinh: getDefaultBirthDay(),
        diachi: "",
        sdt: "",
        chucvu: "",
        matkhau: "",
        quyen: "",
        mabp: "",
        madv: "",
    };

    const handleStudentFormSubmit = async (formValues: BaseNV) => {
        console.log(formValues);
        const response = await userApi.addUser(formValues);
        if (response.status === "successfully") {
            dispatch(userActions.fetchUserList({ ...filter }));
        }
    };
    //console.log(getDefaultBirthDay());

    const handleChangeFile = (event: any) => {
        setFileUpload(event.target.files[0]);
    };
    console.log(fileUpload);
    return (
        <div style={{ height: "100vh", boxSizing: "border-box" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundImage:
                        "linear-gradient(0deg,rgb(255,255,255),#ffcdd2)",
                    padding: "0 40px 16px 40px",
                }}
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
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginRight: "40px",
                }}
            >
                <input type="file" name="" id="" onChange={handleChangeFile} />
                <Button
                    variant="outlined"
                    onClick={async () => {
                        const formData = new FormData();
                        formData.append("upload", fileUpload);
                        // const binaryData = await userApi.addMultiUser(
                        //     formData
                        // );

                        const response = await axios({
                            method: "post",
                            url: "http://localhost:8080/user/addmulti",
                            data: formData,
                            responseType: "blob",
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        });

                        const blob = new Blob([response.data], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            // type: "application/vnd.ms-excel"
                        });
                        const url = window.URL || window.webkitURL;
                        const link = url.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.setAttribute("download", "user.xlsx");
                        a.setAttribute("href", link);
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);

                        dispatch(userActions.fetchUserList(filter));
                    }}
                >
                    Tạo Tài Khoản
                </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    padding: "0px 40px 0px 40px",
                }}
            >
                <div style={{ marginTop: "28px" }}>
                    <TableContainer component={Paper} sx={{}}>
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
                                            {row.nv?.chucvu}
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
                <Paper
                    style={{
                        maxWidth: "40%",
                        marginTop: "12px",
                        boxSizing: "border-box",
                        padding: "12px 32px 12px 32px",
                    }}
                >
                    <AddUserForm
                        initialValue={initialValue}
                        onSubmit={handleStudentFormSubmit}
                    ></AddUserForm>
                </Paper>
            </div>
        </div>
    );
}
