import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
} from "@mui/material";
import React, { ReactElement } from "react";
import { InputField, SelectField, SelectOption } from "../../FormField";
import { useForm } from "react-hook-form";
import { getCurrentDate } from "../../../Utils/getCurrentDate";

interface IXuly {
    xulychinh?: string;
    xulykethop?: string;
    ykien?: string;
    nhanxuly?: string;
    hanxuly?: string;
}

const initialValue: IXuly = {
    xulychinh: "",
    xulykethop: "",
    ykien: "",
    nhanxuly: "",
    hanxuly: getCurrentDate(),
};
export default function XuLy() {
    const { control, handleSubmit } = useForm<IXuly>({
        defaultValues: initialValue,
    });
    const [value, setValue] = React.useState("chuyen");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    const handleSubmitForm = async (formValues: IXuly) => {
        if (value === "phancong") console.log(formValues);
    };
    const xuLyChinhOptions: SelectOption[] = [
        { label: "Cán Bộ 1", value: "cb1" },
        { label: "Cán Bộ 2", value: "cb2" },
    ];
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
                        value="phancong"
                        control={<Radio />}
                        label="Phân công xử lý"
                    />
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
            {value === "phancong" && (
                <div style={{ width: "50%" }}>
                    <SelectField
                        name="xulychinh"
                        control={control}
                        label="Xử lý chính"
                        options={xuLyChinhOptions}
                    ></SelectField>
                    <SelectField
                        name="xulykethop"
                        control={control}
                        label="Xử lý kết hợp"
                        options={xuLyChinhOptions}
                    ></SelectField>
                    <InputField
                        name="ykien"
                        control={control}
                        label="Ý Kiến"
                    ></InputField>
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
        </form>
    );
}
