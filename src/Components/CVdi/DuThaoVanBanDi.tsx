import { Button, Grid, Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { InputField, SelectField } from "../FormField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IDuThaoVanBanDi {
    donvicv: string;
    loaivanban: string;
    trichyeu: string;
    taptindinhkem: string;
    dokhan: string;
    domat: string;
    linhvuc: string;
    soto: string;
    thuchientheovanban: string;
}

const initialValue: IDuThaoVanBanDi = {
    donvicv: "",
    loaivanban: "",
    trichyeu: "",
    taptindinhkem: "",
    dokhan: "",
    domat: "",
    linhvuc: "",
    soto: "",
    thuchientheovanban: "",
};

const schema = yup.object().shape({
    trichyeu: yup.string().required("Trích Yếu Văn Bản Không Được Để Trống"),
});

export default function DuThaoVanBanDi() {
    const { control, handleSubmit } = useForm<IDuThaoVanBanDi>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleSubmitForm = async (formValues: IDuThaoVanBanDi) => {
        console.log(formValues);
    };

    return (
        <form
            onSubmit={handleSubmit(handleSubmitForm)}
            style={{ marginTop: "24px" }}
        >
            {" "}
            <div
                style={{
                    fontSize: "28px",
                    textAlign: "center",
                    color: "blue",
                    fontFamily: "coiny",
                }}
            >
                Dự Thảo Văn Bản Đi
            </div>
            <Grid container spacing={2} sx={{ width: "80%", margin: "0 auto" }}>
                <Grid item xs={6}>
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
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <SelectField
                            name="loaivanban"
                            control={control}
                            label="Loại Công Văn"
                            options={[
                                {
                                    label: "Biên Bản",
                                    value: "bb",
                                },
                                {
                                    label: "Quyết Định",
                                    value: "qd",
                                },
                            ]}
                        ></SelectField>
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
                        name="trichyeu"
                        control={control}
                        label="Trích Yếu"
                    ></InputField>
                    <InputField
                        name="taptindinhkem"
                        control={control}
                        label="Tập Tin Đính Kèm"
                    ></InputField>
                </Grid>
                <Grid item xs={6}>
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
                        name="soto"
                        control={control}
                        label="Số Tờ"
                    ></InputField>
                    <InputField
                        name="thuchientheovanban"
                        control={control}
                        label="Thực hiện theo văn bản"
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
