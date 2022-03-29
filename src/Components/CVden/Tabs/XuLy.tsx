import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Grid,
} from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import { InputField, SelectField, SelectOption } from "../../FormField";
import { useForm } from "react-hook-form";
import { getCurrentDate } from "../../../Utils/getCurrentDate";
import {
    getDonViFromToken,
    getPermission,
} from "../../../Utils/getValueFormToken";
import NhanVienAPI, { NhanVien } from "../../../API/NhanVien";
import cvDenApi from "../../../API/CVDen";
import Alert from "@mui/material/Alert";

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
    hanchuyenxuly :  getCurrentDate(),
};
export default function XuLy(props: { macvden: string }) {
    const { macvden } = props;
    const [nhanvien, setNhanVien] = React.useState<[NhanVien]>([
        { manv: "", tennv: "" },
    ]);
    const [alert, setAlert] = React.useState<boolean>(false);
    const { control, handleSubmit } = useForm<IXuly>({
        defaultValues: initialValue,
    });
    const [value, setValue] = React.useState("chuyen");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    const handleSubmitForm = async (formValues: IXuly) => {
        if (value === "phancong") {
            formValues.macvden = macvden;
            const add = await cvDenApi.phanCongXuLyCVDen(formValues);
            if(add.status === "successfully") setAlert(true);
        }
    };

    const madv = getDonViFromToken();
    console.log(madv);
    useEffect(() => {
        (async () => {
            const data = await NhanVienAPI.getNhanVienByMadv(madv);
            setNhanVien(data);
        })();
    }, []);
    const xuLyChinhOptions: SelectOption[] = nhanvien?.map((nv) => ({
        label: nv.tennv,
        value: nv.manv,
    }));

    const permission = getPermission();
    //console.log(permission);
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

                    {alert && (
                        <Alert
                            severity="success"
                            role="alert"
                            onClose={() => {
                                setAlert(false);
                            }}
                        >
                           Phân công xử lý thành công!
                        </Alert>
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
                    <Button type="submit" variant="contained" color="secondary">
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
        </form>
    );
}
