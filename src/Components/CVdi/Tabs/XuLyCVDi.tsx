import React, { ChangeEvent, ReactElement } from "react";
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Grid,
} from "@mui/material";
import { InputField, SelectField, SelectOption } from "../../FormField";
import { useForm } from "react-hook-form";
import { getCurrentDate } from "../../../Utils/getCurrentDate";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect } from "react";
import donViApi, { IDonVi } from "../../../API/DonVi";
import NhanVienAPI, { NhanVien } from "../../../API/NhanVien";
import cvDiApi from "../../../API/CVdi";

export interface IXuLyCVDi {
    mavbdi: string;
    nguoinhan?: string;
    butphechuyen?: string;
    hanxuly?: string;
}
const initialValue: IXuLyCVDi = {
    mavbdi: "",
    nguoinhan: "",
    butphechuyen: "",
    hanxuly: getCurrentDate(),
};
export default function XuLyCVDi(props: { mavbdi: string }) {
    const { mavbdi } = props;
    console.log(mavbdi);
    const { control, handleSubmit } = useForm<IXuLyCVDi>({
        defaultValues: initialValue,
    });
    const [value, setValue] = React.useState("phancong");
    const [donvi, setDonVi] = React.useState<[IDonVi]>();
    const [nhanvien, setNhanVien] = React.useState<[NhanVien]>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const [dvChuyen, setdvChuyen] = React.useState<string>("");
    useEffect(() => {
        (async () => {
            const dv = await donViApi.getDonVi();
            setDonVi(dv);
        })();
    }, []);

    const handleChangeDV = async (event: SelectChangeEvent) => {
        setdvChuyen(event.target.value as string);
        const nv = await NhanVienAPI.getNhanVienByMadv(
            parseInt(event.target.value)
        );
        setNhanVien(nv);
    };
    let nhanVienOptions: SelectOption[] = [];

    if (nhanvien !== undefined) {
        nhanVienOptions = nhanvien?.map((dv) => ({
            label: dv.tennv,
            value: dv.manv,
        }));
    }

    const handleSubmitForm = async (formValues: IXuLyCVDi) => {
        if (value === "chuyen") {
            formValues.mavbdi = mavbdi;
            console.log(formValues);
            const response = await cvDiApi.chuyenXuLy(formValues);
            if (response.status === "successfully")
                console.log(response.massage);
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
                </RadioGroup>
            </FormControl>

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
                        // onClick={() => {
                        //     setOpenApproveDialog(true);
                        // }}
                    >
                        Xác nhận hoàn thành xử lý văn bản
                    </Button>
                </div>
            )}
            {value === "chuyen" && (
                <div style={{ width: "50%" }}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Age
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dvChuyen}
                                label="DV Chuyen"
                                onChange={handleChangeDV}
                            >
                                {donvi?.map((row) => (
                                    <MenuItem value={row.madv} key={row.madv}>
                                        {row.tendv}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* {nhanVienOptions.length > 0 && ( */}
                    <SelectField
                        name="nguoinhan"
                        control={control}
                        label="Nhận xử lý"
                        options={nhanVienOptions}
                    ></SelectField>
                    {/* )} */}
                    <InputField
                        name="butphechuyen"
                        control={control}
                        label="Bút Phê"
                    ></InputField>
                    <InputField
                        name="hanxuly"
                        control={control}
                        label="Hạn xử lý"
                        type="date"
                    ></InputField>
                    <Button type="submit" variant="outlined" color="info">
                        Xác nhận chuyển xử lý
                    </Button>
                </div>
            )}
            {/* {alert && (
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
            </Dialog> */}
        </form>
    );
}
