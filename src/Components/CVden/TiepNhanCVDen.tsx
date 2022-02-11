import { Button, Grid, Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { InputField, SelectField } from "../FormField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface TiepNhanCVDen {
    donvicv: string;
    loaivanban: string;
    sohieugoc: string;
    coquanbanhanh: string;
    ngaybanhanh: string;
    trichyeu: string;
    ngaycohieuluc: string;
    ngayhethieuluc: string;
    nguoiky: string;
    soto: string;
    taptindinhkem: string;
    socongvan: string;
    soden: string;
    ngayden: string;
    dokhan: string;
    domat: string;
    linhvuc: string;
    hanxuli: string;
    noinhan: string;
}

const initialValue: TiepNhanCVDen = {
    donvicv: "",
    loaivanban: "",
    sohieugoc: "",
    coquanbanhanh: "",
    ngaybanhanh: "2021-02-12",
    trichyeu: "",
    ngaycohieuluc: "2021-02-12",
    ngayhethieuluc: "2021-02-12",
    nguoiky: "",
    soto: "",
    taptindinhkem: "",
    socongvan: "",
    soden: "",
    ngayden: "2021-02-12",
    dokhan: "",
    domat: "",
    linhvuc: "",
    hanxuli: "",
    noinhan: "",
};

const schema = yup.object().shape({
    trichyeu: yup.string().required("Trích Yếu Văn Bản Không Được Để Trống"),
});

export default function TiepNhanCVDen() {
    const { control, handleSubmit } = useForm<TiepNhanCVDen>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleSubmitForm = async (formValues: TiepNhanCVDen) => {
        console.log(formValues);
    };

    return (
        <form
            onSubmit={handleSubmit(handleSubmitForm)}
            style={{ marginTop: "24px" }}
        >
            <div
                style={{ fontSize: "28px", textAlign: "center", color: "blue", fontFamily:"coiny" }}
            >
                Tiếp Nhận Văn Bản
            </div>
            <Grid container spacing={2} sx={{ width: "80%", margin: "0 auto" }}>
                <Grid item xs={6}>
                    <Stack>
                        <SelectField
                            name="donvicv"
                            control={control}
                            label="Đơn Vị"
                            options={[
                                {
                                    label: "Phòng Kế Hoạch Đào Tạo",
                                    value: "pkhdt",
                                },
                                {
                                    label: "Khoa Công Nghệ Thông Tin",
                                    value: "cntt",
                                },
                            ]}
                        ></SelectField>
                        <SelectField
                            name="loaivanban"
                            control={control}
                            label="Loại Văn Bản"
                            options={[
                                {
                                    label: "Biên Bản",
                                    value: "bb",
                                },
                                {
                                    label: "Nghị Quyết",
                                    value: "nq",
                                },
                            ]}
                        ></SelectField>

                        <InputField
                            name="coquanbanhanh"
                            control={control}
                            label="Cơ Quan Ban Hành"
                        ></InputField>
                        <Stack direction="row">
                            <InputField
                                name="ngaybanhanh"
                                control={control}
                                label="Ngày Ban Hành"
                                type="date"
                            ></InputField>
                            <InputField
                                name="sohieugoc"
                                control={control}
                                label="Số Hiệu Góc"
                            ></InputField>
                        </Stack>

                        <InputField
                            name="trichyeu"
                            control={control}
                            label="Trích Yếu"
                        ></InputField>
                        <Stack direction="row">
                            <InputField
                                name="ngaycohieuluc"
                                control={control}
                                label="Ngày Có Hiệu Lực"
                                type="date"
                            ></InputField>
                            <InputField
                                name="ngayhethieuluc"
                                control={control}
                                label="Ngày Hết Hiệu Lực"
                                type="date"
                            ></InputField>
                        </Stack>
                        <Stack direction="row">
                            <InputField
                                name="nguoiky"
                                control={control}
                                label="Người Ký"
                            ></InputField>
                            <InputField
                                name="soto"
                                control={control}
                                label="Số Tờ"
                            ></InputField>
                        </Stack>
                        <InputField
                            name="taptindinhkem"
                            control={control}
                            label="Tập Tin Đính Kèm"
                        ></InputField>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <SelectField
                        name="socongvan"
                        control={control}
                        label="Sổ Công Văn"
                        options={[
                            {
                                label: "SCV2021",
                                value: "scv2021",
                            },
                            {
                                label: "Sổ Quyết Định",
                                value: "quyetdinh",
                            },
                        ]}
                    ></SelectField>
                    <InputField
                        name="soden"
                        control={control}
                        label="Số Đến"
                    ></InputField>
                    <InputField
                        name="ngayden"
                        control={control}
                        label="Ngày Đến"
                        type="date"
                    ></InputField>
                    <Stack direction="row">
                        <SelectField
                            name="dokhan"
                            control={control}
                            label="Độ Khẩn"
                            options={[
                                {
                                    label: "Khẩn",
                                    value: "khan",
                                },
                                {
                                    label: "Bình Thường",
                                    value: "bth",
                                },
                            ]}
                        ></SelectField>
                        <SelectField
                            name="domat"
                            control={control}
                            label="Độ Mật"
                            options={[
                                {
                                    label: "Bảo Mật",
                                    value: "bm",
                                },
                                {
                                    label: "Bình Thường",
                                    value: "bth",
                                },
                            ]}
                        ></SelectField>
                    </Stack>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <InputField
                            name="linhvuc"
                            control={control}
                            label="Lĩnh Vực"
                        ></InputField>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            sx={{ height: "56px", margin: "7px 0px 0px 12px" }}
                        >
                            Thêm
                        </Button>
                    </div>
                    <InputField
                        name="hanxuli"
                        control={control}
                        label="Hạn Xử Lí"
                    ></InputField>
                    <InputField
                        name="noinhan"
                        control={control}
                        label="Nơi Nhận"
                    ></InputField>
                    <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                            Tiếp Tục
                        </Button>
                    </div>
                    
                </Grid>
            </Grid>
        </form>
    );
}
