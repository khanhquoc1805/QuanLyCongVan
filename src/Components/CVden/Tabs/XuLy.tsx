import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup
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
    getPermission
} from "../../../Utils/getValueFormToken";
import { InputField, SelectField, SelectOption } from "../../FormField";

export interface IXuly {
    macvden?: number | string;
    maxulychinh?: string;
    maxulykethop?: string;
    butphexulychinh?: string;
    butphexulykethop?: string;
    hanxulychinh?: string;
    hanxulykethop?: string;
    hanchuyenxuly?: string;
}

const initialValue: IXuly = {
    maxulychinh: "",
    maxulykethop: "",
    butphexulychinh: "",
    butphexulykethop: "",
    hanxulychinh: getCurrentDate(),
    hanxulykethop: getCurrentDate(),
    hanchuyenxuly: getCurrentDate(),
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
    const { control, handleSubmit } = useForm<IXuly>({
        defaultValues: initialValue,
    });
    const [value, setValue] = React.useState("phancong");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    const handleSubmitForm = async (formValues: IXuly) => {
        if (value === "phancong") {
            formValues.macvden = macvden;
            const add = await cvDenApi.phanCongXuLyCVDen(formValues);
          
            if (add.status === "successfully") {
                setMassage(add.massage);
                setAlert(true);
            }
        }
    };

    const madv = getDonViFromToken();

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
    console.log(role);
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
                    <Grid container spacing={2}>
                        <Grid item lg={4}>
                            <SelectField
                                name="maxulychinh"
                                control={control}
                                label="Xử lý chính"
                                options={xuLyChinhOptions}
                            ></SelectField>
                            <SelectField
                                name="maxulykethop"
                                control={control}
                                label="Xử lý kết hợp"
                                options={xuLyChinhOptions}
                            ></SelectField>
                        </Grid>
                        <Grid item lg={4}>
                            <InputField
                                name="butphexulychinh"
                                control={control}
                                label="Bút Phê"
                            ></InputField>
                            <InputField
                                name="butphexulykethop"
                                control={control}
                                label="Bút Phê"
                            ></InputField>
                        </Grid>
                        <Grid item lg={4}>
                            <InputField
                                name="hanxulychinh"
                                control={control}
                                label="Hạn xử lý"
                                type="date"
                            ></InputField>
                            <InputField
                                name="hanxulykethop"
                                control={control}
                                label="Hạn xử lý"
                                type="date"
                            ></InputField>
                        </Grid>
                    </Grid>

                    <Button type="submit" variant="outlined" color="primary">
                        Xác nhận
                    </Button>
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
