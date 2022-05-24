import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import cvDenApi from "../../../API/CVDen";
import NhanVienAPI, { NhanVien } from "../../../API/NhanVien";
import { getCurrentDate } from "../../../Utils/getCurrentDate";
import {
    getDonViFromToken,
    getMaNVFromToken,
    getPermission,
} from "../../../Utils/getValueFormToken";
import { InputField, SelectField, SelectOption } from "../../FormField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { xulystring } from "../../../Utils/getRoleFormString";

// export interface IXuly {
//     macvden?: number | string;
//     maxulychinh?: string;
//     maxulykethop?: string;
//     butphexulychinh?: string;
//     butphexulykethop?: string;
//     hanxulychinh?: string;
//     hanxulykethop?: string;
//     hanchuyenxuly?: string;
// }
export interface IXuly {
    macvden?: number | string;
    xuly1: string;
    xuly2: string;
    xuly3: string;
    xuly4: string;
    xuly5: string;
    butphe1: string;
    butphe2: string;
    butphe3: string;
    butphe4: string;
    butphe5: string;
    hanxuli1: string;
    hanxuli2: string;
    hanxuli3: string;
    hanxuli4: string;
    hanxuli5: string;
    vaitro1: string;
    vaitro2: string;
    vaitro3: string;
    vaitro4: string;
    vaitro5: string;
	hanchuyenxuly?: string;
}

const initialValue: IXuly = {
    // maxulychinh: "",
    // maxulykethop: "",
    // butphexulychinh: "",
    // butphexulykethop: "",
    // hanxulychinh: getCurrentDate(),
    // hanxulykethop: getCurrentDate(),
    // hanchuyenxuly:getCurrentDate(),
    xuly1: "",
    xuly2: "",
    xuly3: "",
    xuly4: "",
    xuly5: "",
    butphe1: "",
    butphe2: "",
    butphe3: "",
    butphe4: "",
    butphe5: "",
    hanxuli1: getCurrentDate(),
    hanxuli2: getCurrentDate(),
    hanxuli3: getCurrentDate(),
    hanxuli4: getCurrentDate(),
    hanxuli5: getCurrentDate(),
    vaitro1: "",
    vaitro2: "",
    vaitro3: "",
    vaitro4: "",
    vaitro5: "",
	hanchuyenxuly:getCurrentDate(),
};
export default function XuLy(props: { macvden: string }) {
    const { macvden } = props;
    const [nhanvien, setNhanVien] = React.useState<[NhanVien]>([
        { manv: "", tennv: "" },
    ]);
    const [manv, setManv] = React.useState<string>("");
    const [role, setRole] = React.useState<string>();
    const [massage, setMassage] = React.useState<string>("");
    const [openApproveDialog, setOpenApproveDialog] =
        React.useState<boolean>(false);
    const [alert, setAlert] = React.useState<boolean>(false);
    const { control, handleSubmit, setValue } = useForm<IXuly>({
        defaultValues: initialValue,
    });
    const [value, setValues] = React.useState("phancong");
    const [num, setNum] = React.useState("");
    const handleChangeNum = (event: SelectChangeEvent) => {
        setNum(event.target.value as string);
    };

    let indexs = [];

    for (var i = 1; i <= parseInt(num); i++) {
        indexs.push(i);
    }
    useEffect(() => {
        setValue("xuly1", "");
        setValue("xuly2", "");
        setValue("xuly3", "");
        setValue("xuly4", "");
        setValue("xuly5", "");
        setValue("butphe1", "");
        setValue("butphe2", "");
        setValue("butphe3", "");
        setValue("butphe4", "");
        setValue("butphe5", "");
        setValue("hanxuli1", getCurrentDate());
        setValue("hanxuli2", getCurrentDate());
        setValue("hanxuli3", getCurrentDate());
        setValue("hanxuli4", getCurrentDate());
        setValue("hanxuli5", getCurrentDate());
        setValue("vaitro1", "");
        setValue("vaitro2", "");
        setValue("vaitro3", "");
        setValue("vaitro4", "");
        setValue("vaitro5", "");
    }, [num]);

    console.log(indexs);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues((event.target as HTMLInputElement).value);
    };
    const handleSubmitForm = async (formValues: IXuly) => {
        if (value === "phancong") {
            formValues.macvden = macvden;
            const add = await cvDenApi.phanCongXuLyCVDen(formValues);
            //console.log(formValues);

            if (add.status === "successfully") {
                setMassage(add.massage);
                setAlert(true);
            }
        }
    };

    const madv = getDonViFromToken();
    const macb = getMaNVFromToken();

    useEffect(() => {
        (async () => {
            const data = await NhanVienAPI.getNhanVienByMadv(madv);
            setNhanVien(data);
            const manv = getMaNVFromToken();
            setManv(manv);
            const quyen = await cvDenApi.xacNhanQuyenXuLy({
                manv: manv,
                macvden: macvden,
            });
            setRole(quyen.status);
        })();
    }, []);
    //console.log(role);
    const xuLyChinhOptions: SelectOption[] = nhanvien?.map((nv) => ({
        label: nv.tennv,
        value: nv.manv,
    }));

    const permission = getPermission();
    //console.log(permission);

    const handleApproveConfirm = async () => {
        const process = await cvDenApi.hoanThanhXuLy({
            manv: manv,
            macvden: macvden,
        });
        if (process.status === "successfully") {
            setMassage(process.massage);
            setAlert(true);
            setOpenApproveDialog(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Xử lý công văn</FormLabel>
                <RadioGroup
                    aria-label="method"
                    name="method"
                    value={value}
                    onChange={handleChange}
                    row
                >
                    {permission === "lanhdao" && (
                        <FormControlLabel
                            value="phancong"
                            control={<Radio />}
                            label="Phân công xử lý"
                        />
                    )}
                    {role === "successfully" || permission === "lanhdao" ? (
                        <>
                            <FormControlLabel
                                value="hoanthanh"
                                control={<Radio />}
                                label="Hoàn thành xử lý"
                            />
                            <FormControlLabel
                                value="chuyen"
                                control={<Radio />}
                                label="Chuyển xử lý"
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </RadioGroup>
            </FormControl>
            {value === "phancong" && permission === "lanhdao" && (
                <div style={{ width: "90%" }}>
                    <FormControl sx={{ width: "20%" }}>
                        <InputLabel id="demo-simple-select-label">
                            Chọn số lượng cán bộ
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={num}
                            label="Chọn số lượng cán bộ"
                            onChange={handleChangeNum}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>

                    <div>
                        {indexs.map((index) => (
                            <Grid container spacing={2} key={index}>
                                <Grid item lg={3}>
                                    <SelectField
                                        name={xulystring(index, "xuly")}
                                        control={control}
                                        label="Cán bộ xử lý"
                                        options={xuLyChinhOptions}
                                    ></SelectField>
                                </Grid>
                                <Grid item lg={3}>
                                    <InputField
                                        name={xulystring(index, "butphe")}
                                        control={control}
                                        label="Bút Phê"
                                    ></InputField>
                                </Grid>
                                <Grid item lg={3}>
                                    <InputField
                                        name={xulystring(index, "hanxuli")}
                                        control={control}
                                        label="Hạn xử lý"
                                        type="date"
                                    ></InputField>
                                </Grid>
                                <Grid item lg={3}>
                                    <SelectField
                                        name={xulystring(index, "vaitro")}
                                        control={control}
                                        label="Vai trò"
                                        options={[
                                            {
                                                label: "Xử lý chính",
                                                value: "xulychinh",
                                            },
                                            {
                                                label: "Xử lý kết hợp",
                                                value: "xulykethop",
                                            },
                                        ]}
                                    ></SelectField>
                                </Grid>
                            </Grid>
                        ))}
                    </div>
                    {num !== "" && (
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Xác nhận
                        </Button>
                    )}
                </div>
            )}
            {value === "hoanthanh" && (
                <div
                    style={{
                        backgroundColor: "#F0F7F7",
                        height: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setOpenApproveDialog(true);
                        }}
                    >
                        Xác nhận hoàn thành xử lý văn bản
                    </Button>
                </div>
            )}
            {value === "chuyen" && (
                <div style={{ width: "50%" }}>
                    <SelectField
                        name="nhanxuly"
                        control={control}
                        label="Nhận xử lý"
                        options={xuLyChinhOptions}
                    ></SelectField>
                    <InputField
                        name="hanchuyenxuly"
                        control={control}
                        label="Hạn xử lý"
                        type="date"
                    ></InputField>
                    <Button type="submit" variant="outlined" color="info">
                        Xác nhận chuyển xử lý
                    </Button>
                </div>
            )}
            {alert && (
                <Alert
                    variant="filled"
                    severity="success"
                    role="alert"
                    onClose={() => {
                        setAlert(false);
                    }}
                >
                    <strong> {massage}</strong>
                </Alert>
            )}
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
                        Bạn có chắc chắn muốn hoàn thành xử lý!
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
                        Duyệt
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}
