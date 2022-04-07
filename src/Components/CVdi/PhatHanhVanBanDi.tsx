import { yupResolver } from "@hookform/resolvers/yup";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
    DialogActions,
    DialogContent,
    DialogContentText,
    Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import cvDiApi from "../../API/CVdi";
import donViApi, { IDonVi } from "../../API/DonVi";
import { ResponseStatus } from "../../API/SoCV";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import PreviewDialog from "../../Components/PreviewDialog/PreviewDialog";
import {
    cvDiActions,
    selectDsCVDi,
    selectFilter,
    selectPagination,
} from "../../features/CVDi/CVDiSlice";
import { selectDsSoCV, soCVActions } from "../../features/SoCV/SoCVSlice";
import { ICVDi, NoiNhanCVDi } from "../../Model/CVDiModel";
import { getDateFromString } from "../../Utils/getDateFromString";
import { getColorProcess, getProcessState } from "../../Utils/getProcessState";
import { getDonViFromToken } from "../../Utils/getValueFormToken";
import { RadioGroupField, RadioOption } from "../FormField";
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
export interface AddCVVaoSo {
    masocv: string;
    mavbdi: number;
}

const initialValue: AddCVVaoSo = {
    masocv: "",
    mavbdi: 0,
};

const schema = yup.object().shape({
    masocv: yup.string().required("Vui lòng chọn sổ muốn thêm."),
});

function Row(props: {
    row: ICVDi;
    openDialog: any;
    setOpenDialog: any;
    soCVOptions: RadioOption[];
    mavbdi: any;
    setMavbdi: any;
}) {
    const { row, openDialog, setOpenDialog, soCVOptions, mavbdi, setMavbdi } =
        props;

    const [checked, setChecked] = React.useState<[number]>([0]);
    const [open, setOpen] = React.useState(false);
    const filter = useAppSelector(selectFilter);
    const dispatch = useAppDispatch();
    const [openPreview, setOpenPreview] = useState<boolean>(false);
    const [openNoiNhanDialog, setOpenNoiNhanDialog] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");
    const [donVi, setDonVi] = useState<[IDonVi]>([{ madv: 1, tendv: "" }]);
    const { control, handleSubmit } = useForm<AddCVVaoSo>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const [constraint, setConstraint] = useState<boolean>(false);

    const [all, setAll] = React.useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const donvi = await donViApi.getDonVi();
            setDonVi(donvi);
        })();
    }, []);
    const donViFilter = donVi.filter((x) => x.madv !== getDonViFromToken());
    useEffect(() => {
        if (all) {
            let checkedArray: [number] = [0];
            checkedArray.splice(0, 1);
            for (let i = 0; i < donViFilter.length; ++i) {
                checkedArray.push(donViFilter[i].madv);
            }
            setChecked(checkedArray);
        }
    }, [all]);

    useEffect(() => {
        if (checked.length !== donViFilter.length) {
            setAll(false);
        }
        const index = checked.indexOf(0);
        if (index !== -1) checked.splice(index, 1);
    }, [checked]);

    const handleCLickAdd = (code: number) => {
        setMavbdi(code);
        setOpenDialog(true);
        //console.log("asass");
    };
    const handleToggle = (value: number) => () => {
        const currentIndex = checked?.indexOf(value);
        const newChecked: [number] = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    console.log(checked);
    const handleSubmitForm = async (formValues: AddCVVaoSo) => {
        formValues.mavbdi = mavbdi;
        const response: ResponseStatus = await cvDiApi.addCVDiVaoSo(formValues);
        console.log(response);
        if (response.status === "successfully") setOpenDialog(false);
        setOpen(false);
        dispatch(
            cvDiActions.fetchData({ ...filter, status: "daduyet,davaoso" })
        );
    };

    const handleAddNoiNhan = async (formValues: NoiNhanCVDi) => {
        const response = await cvDiApi.addNoiNhan(formValues);
        if (response.status === "successfully") {
            setOpenNoiNhanDialog(false);
            dispatch(
                cvDiActions.fetchData({
                    ...filter,
                    status: "hoanthanhxuly,davaoso,daphathanh",
                })
            );
        }
    };

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
                    ></Box>
                </TableCell>
                <TableCell align="center">
                    <ArrowForwardIcon
                        color="success"
                        onClick={() => {
                            if (row.cvdi.masocv !== null) {
                                setOpenNoiNhanDialog(true);
                            } else {
                                setConstraint(true);
                            }
                        }}
                    />
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
                                        <TableCell align="right">
                                            {row.duthao.tennv}
                                        </TableCell>
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
                                                    onClick={() => {
                                                        setOpenPreview(true);
                                                        setUrl(
                                                            row.ttbosung.dinhkem
                                                        );
                                                    }}
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="center">
                                            <img
                                                onClick={() => {
                                                    handleCLickAdd(
                                                        row.cvdi.mavbdi
                                                    );
                                                }}
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

            <Dialog
                open={openDialog}
                fullWidth
                onClose={() => {
                    setOpenDialog(false);
                }}
            >
                <Stack direction="row" justifyContent="space-between">
                    <DialogTitle>Thêm công văn vào sổ</DialogTitle>
                    <Button
                        onClick={() => {
                            setOpenDialog(false);
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
                        <RadioGroupField
                            name="masocv"
                            control={control}
                            label=""
                            options={soCVOptions}
                        ></RadioGroupField>
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
            <PreviewDialog
                open={openPreview}
                url={url}
                setOpen={setOpenPreview}
            />

            <Dialog
                open={openNoiNhanDialog}
                onClose={() => {
                    setOpenNoiNhanDialog(false);
                }}
            >
                <div>
                    <h1 style={{ textAlign: "center" }}>Phát hành văn bản</h1>
                    <List
                        sx={{
                            boxSizing: "border-box",
                            width: "100%",
                            maxWidth: 960,
                            bgcolor: "background.paper",
                            minWidth: "600px",
                            paddingLeft: "66px",
                        }}
                    >
                        <h2>Chọn nơi nhận văn bản </h2>

                        <ListItem
                            key={0}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="comments"
                                ></IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton
                                role={undefined}
                                onClick={() => {
                                    setAll(!all);
                                }}
                                dense
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={all}
                                        disableRipple
                                        color="error"
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    //id={labelId}
                                    primary={"Tất cả"}
                                />
                            </ListItemButton>
                        </ListItem>
                        {donVi?.map((value) => {
                            const labelId = `checkbox-list-label-${value.tendv}`;
                            if (value.madv !== getDonViFromToken()) {
                                return (
                                    <ListItem
                                        key={value.madv}
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                aria-label="comments"
                                            ></IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton
                                            role={undefined}
                                            onClick={handleToggle(value.madv)}
                                            dense
                                        >
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={
                                                        checked.indexOf(
                                                            value.madv
                                                        ) !== -1
                                                    }
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{
                                                        "aria-labelledby":
                                                            labelId,
                                                    }}
                                                    color="error"
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                id={labelId}
                                                primary={`${value.tendv}`}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            }
                        })}
                    </List>
                    <div
                        style={{
                            textAlign: "center",
                            margin: "16px 0px 32px 0px",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: "50%" }}
                            onClick={() => {
                                const formValues = {
                                    mavbdi: mavbdi,
                                    dsnoinhan: checked,
                                };
                                handleAddNoiNhan(formValues);
                            }}
                        >
                            {" "}
                            Phát hành văn bản
                        </Button>
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={constraint}
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
                        Bạn cần thêm công văn vào sổ trước khi phát hành!
                        <br />
                        Quay lại sau khi đã thêm vào sổ!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setConstraint(false);
                        }}
                        color="primary"
                        variant="outlined"
                    >
                        Đóng
                    </Button>
                    <Button
                        onClick={() => {
                            setConstraint(false);
                            setOpenDialog(true);
                        }}
                        color="secondary"
                        variant="contained"
                        autoFocus
                    >
                        Thêm vào sổ
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default function PhatHanhVanBanDi() {
    const filter = useAppSelector(selectFilter);
    const dispatch = useAppDispatch();
    const dscvdi = useAppSelector(selectDsCVDi);
    const pagination = useAppSelector(selectPagination);
    const [open, setOpen] = useState<boolean>(false);
    const dssocv = useAppSelector(selectDsSoCV);
    const [mavbdi, setMavbdi] = useState<number>(0);

    useEffect(() => {
        (async () => {
            dispatch(
                cvDiActions.fetchData({
                    ...filter,
                    status: "hoanthanhxuly,davaoso,daphathanh",
                })
            );
            dispatch(soCVActions.fetchData({}));
        })();
    }, [dispatch, filter]);
    console.log(mavbdi);

    const soCVOptions: RadioOption[] = dssocv?.map((scv) => ({
        label: `${scv.tensocv} - ${scv.nhomsocv} - ${scv.donvi?.tendv}`,
        value: scv.masocv,
    }));

    const dscvdiFilterByDV = dscvdi.filter(
        (x) => x.donvi.madv === getDonViFromToken()
    );

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
                        {dscvdiFilterByDV.map((row, index) => (
                            <Row
                                key={index}
                                row={row}
                                openDialog={open}
                                setOpenDialog={setOpen}
                                soCVOptions={soCVOptions}
                                mavbdi={row.cvdi.mavbdi}
                                setMavbdi={setMavbdi}
                            />
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
        </div>
    );
}
