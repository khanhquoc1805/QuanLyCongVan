import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
    cvDiActions,
    selectDsCVDi,
    selectFilter,
    selectPagination,
} from "../../features/CVDi/CVDiSlice";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ICVDi } from "../../Model/CVDiModel";
import { getProcessState, getColorProcess } from "../../Utils/getProcessState";
import { getDateFromString } from "../../Utils/getDateFromString";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useForm } from "react-hook-form";
import { SelectField } from "../FormField";

function createData(
    name: string,
    calories: string,
    fat: string,
    carbs: string,
    protein: number,
    price: number
) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: "2020-01-05",
                customerId: "11091700",
                amount: 3,
            },
            {
                date: "2020-01-02",
                customerId: "Anonymous",
                amount: 1,
            },
        ],
    };
}

function Row(props: { row: ICVDi }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.cvdi.tenvbdi}
                </TableCell>
                <TableCell align="left">{row.donvi.tendv}</TableCell>
                <TableCell align="left">{row.linhvuc.tenlv}</TableCell>
                <TableCell align="left">
                    <Box
                        color={getColorProcess(row.cvdi.ttxuly)}
                        dangerouslySetInnerHTML={{
                            __html: `${getProcessState(row.cvdi.ttxuly)}`,
                        }}
                    >
                        {/* {getProcessState(row.cvdi.ttxuly)} */}
                    </Box>
                </TableCell>
                <TableCell align="center">
                    <ArrowForwardIcon color="success" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                        sx={{ backgroundColor: "rgba(249,192,210,0.85)" }}
                    >
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Chi tiết công văn
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ngày ra công văn</TableCell>
                                        <TableCell>Ngày dự thảo</TableCell>
                                        <TableCell align="right">
                                            Cán bộ
                                        </TableCell>
                                        <TableCell align="right">
                                            Loại công văn
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ width: "80px" }}
                                        >
                                            Đính kèm
                                        </TableCell>
                                        <TableCell align="center">
                                            Thêm vào sổ
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {getDateFromString(
                                                row.cvdi?.ngayravbdi as Date
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {getDateFromString(
                                                row.cvdi?.ngayvbdi as Date
                                            )}
                                        </TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right">
                                            {row.loaicv.tenloai}
                                        </TableCell>
                                        <TableCell align="left">
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
                                        </TableCell>
                                        <TableCell align="center">
                                            <img
                                                src="/medical-records-svgrepo-com.svg"
                                                alt=""
                                                style={{
                                                    width: "24px",
                                                    height: "24px",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export interface AddCVVaoSo {
    masocv : string
}


export default function PhatHanhVanBanDi() {
    const filter = useAppSelector(selectFilter);
    const dispatch = useAppDispatch();
    const dscvdi = useAppSelector(selectDsCVDi);
    const pagination = useAppSelector(selectPagination);
    const [open,setOpen] = useState<boolean>(false);

    const { control, handleSubmit } = useForm<AddCVVaoSo>({
        // defaultValues: initialValue,
        // resolver: yupResolver(schema),
    });

    const handleSubmitForm = async (formValues: AddCVVaoSo) => {
        // const response: ResponseAddLoaiCV = await loaiCVApi.addLoaiCV(
        //     formValues
        // );
        // console.log(response);
        // if (response.status === "successfully") setOpen(false);
    };

    useEffect(() => {
        (() => {
            dispatch(
                cvDiActions.fetchData({ ...filter, status: "daduyet,davaoso" })
            );
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
    return (
        <div>
            <TableContainer component={Paper} sx={{ marginTop: "80px" }}>
                <Table aria-label="collapsible table">
                    <TableHead sx={{ backgroundColor: "red" }}>
                        <TableRow>
                            <TableCell />
                            <TableCell
                                sx={{
                                    color: "white",
                                    fontWeight: "bolder",
                                    width: "500px",
                                }}
                            >
                                Trích yếu
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{
                                    color: "white",
                                    fontWeight: "bolder",
                                    width: "300px",
                                }}
                            >
                                Đơn vị
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{ color: "white", fontWeight: "bolder" }}
                            >
                                Lĩnh vực
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{ color: "white", fontWeight: "bolder" }}
                            >
                                Xử lí
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ color: "white", fontWeight: "bolder" }}
                            >
                                Phát hành
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dscvdi.map((row, index) => (
                            <Row key={index} row={row} />
                        ))}
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

            <Dialog open={open} fullWidth>
                <Stack direction="row" justifyContent="space-between">
                    <DialogTitle>Thêm Loại Công Văn</DialogTitle>
                    <Button
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <img
                            src="/cancel-svgrepo-com.svg"
                            alt=""
                            style={{ width: "24px", height: "24px" }}
                        />
                    </Button>
                </Stack>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Stack
                        direction="column"
                        spacing={3}
                        sx={{ width: "80%", margin: "0 auto" }}
                    >
                        {/* <SelectField
                            name="tenloai"
                            control={control}
                            label="Tên loại công văn"
                            options =
                                {
                                    []
                                }
                            
                        ></SelectField> */}
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        mb={4}
                        mt={2}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            sx={{ width: "120px" }}
                            type="submit"
                        >
                            Xác Nhận
                        </Button>
                    </Stack>
                </form>
            </Dialog>
        </div>
    );
}
