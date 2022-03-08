import { Button, Grid, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputField, SelectField, SelectOption } from "../FormField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import donViApi, { IDonVi } from "../../API/DonVi";
import loaiCVApi, { ILoaiCV } from "../../API/LoaiCV";
import { selectDsSoCV, soCVActions } from "../../features/SoCV/SoCVSlice";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import linhVucApi, { ILinhVuc } from "../../API/LinhVuc";
import { getCurrentDate } from "../../Utils/getCurrentDate";
import cvDenApi from "../../API/CVDen";
import Alert from "@mui/material/Alert";
interface TiepNhanCVDen {
    madv: string;
    maloai: string;
    sohieugoc: string;
    coquanbanhanh: string;
    ngaybanhanh: string;
    trichyeu: string;
    ngaycohieuluc: string;
    ngayhethieuluc: string;
    nguoiky: string;
    sotrang: string;
    dinhkem: File;
    masocv: string;
    soden: string;
    ngayden: string;
    dokhan: string;
    domat: string;
    malv: string;
    hanxuli: string;
    noinhan: string;
    [index: string]: any;
}

const initialValue: TiepNhanCVDen = {
    madv: "",
    maloai: "",
    sohieugoc: "",
    coquanbanhanh: "",
    ngaybanhanh: getCurrentDate(),
    trichyeu: "",
    ngaycohieuluc: getCurrentDate(),
    ngayhethieuluc: getCurrentDate(),
    nguoiky: "",
    sotrang: "",
    dinhkem: new File([""], ""),
    masocv: "",
    soden: "",
    ngayden: getCurrentDate(),
    dokhan: "",
    domat: "",
    malv: "",
    hanxuli: getCurrentDate(),
    noinhan: "",
};

const schema = yup.object().shape({
    madv: yup.string().required("Vui lòng chọn đơn vị."),
    maloai: yup.string().required("Vui lòng chọn loại văn bản."),
    coquanbanhanh: yup.string().required("Cơ quan ban hành không được trống."),
    trichyeu: yup.string().required("Trích Yếu Văn Bản Không Được Để Trống"),
    malv: yup.string().required("Vui lòng chọn lĩnh vực."),
    masocv: yup.string().required("Vui lòng chọn sổ công văn."),
    dokhan: yup.string().required("Vui lòng chọn độ khẩn."),
    domat: yup.string().required("Vui lòng chọn độ mật."),
    hanxuli: yup
        .date()
        .min(getCurrentDate(), "Hạn xử lí phải sau ngày hiện tại"),
});

export default function TiepNhanCVDen() {
    const dispatch = useAppDispatch();
    const dssocv = useAppSelector(selectDsSoCV);
    const { control, handleSubmit } = useForm<TiepNhanCVDen>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });
    const [alert, setAlert] = useState<boolean>(false);

    const [linhVuc, setLinhVuc] = useState<[ILinhVuc]>([
        { malv: 1, tenlv: "" },
    ]);
    const [donVi, setDonVi] = useState<[IDonVi]>([{ madv: 1, tendv: "" }]);
    const [loaiCV, setLoaiCV] = useState<[ILoaiCV]>([
        { maloai: 1, tenloai: "" },
    ]);
    const [fileUpload, setFileUpload] = useState<File>(new File([""], ""));

    useEffect(() => {
        (async () => {
            const linhvuc = await linhVucApi.getLinhVuc();
            setLinhVuc(linhvuc);
            const loaicv = await loaiCVApi.getLoaiCV();
            setLoaiCV(loaicv);
            const donvi = await donViApi.getDonVi();
            setDonVi(donvi);
            dispatch(soCVActions.fetchData({}));
        })();
    }, []);

    const linhVucOptions: SelectOption[] = linhVuc?.map((lv) => ({
        label: lv.tenlv,
        value: lv.malv,
    }));
    const donViOptions: SelectOption[] = donVi?.map((dv) => ({
        label: dv.tendv,
        value: dv.madv,
    }));
    const loaiCVOptions: SelectOption[] = loaiCV?.map((lcv) => ({
        label: lcv.tenloai,
        value: lcv.maloai,
    }));
    const soCVOptions: SelectOption[] = dssocv?.map((scv) => ({
        label: `${scv.tensocv} - ${scv.nhomsocv} - ${scv.donvi?.tendv}`,
        value: scv.masocv,
    }));

    const handleChange = (event: any) => {
        setFileUpload(event.target.files[0]);
    };

    const handleSubmitForm = async (formValues: TiepNhanCVDen) => {
        formValues.dinhkem = fileUpload;
        const formData = new FormData();
        const keys = [
            "madv",
            "maloai",
            "sohieugoc",
            "coquanbanhanh",
            "ngaybanhanh",
            "trichyeu",
            "ngaycohieuluc",
            "ngayhethieuluc",
            "nguoiky",
            "sotrang",
            "dinhkem",
            "masocv",
            "soden",
            "ngayden",
            "dokhan",
            "domat",
            "malv",
            "hanxuli",
            "noinhan",
        ];

        keys.forEach((key) => formData.append(key, formValues[key]));
        const response = await cvDenApi.add(formData);
        console.log(response);
        if (response.status === "successfully") setAlert(true);
    };

    return (
        <form
            onSubmit={handleSubmit(handleSubmitForm)}
            style={{ marginTop: "24px" }}
        >
            <div
                style={{
                    fontSize: "28px",
                    textAlign: "center",
                    color: "blue",
                    fontFamily: "coiny",
                }}
            >
                Tiếp Nhận Văn Bản
            </div>
            {alert && (
                <Alert
                    severity="success"
                    role="alert"
                    onClose={() => {
                        setAlert(false);
                    }}
                >
                    Tiếp nhận văn bản thành công!
                </Alert>
            )}
            <Grid container spacing={2} sx={{ width: "80%", margin: "0 auto" }}>
                <Grid item xs={6}>
                    <Stack>
                        <SelectField
                            name="madv"
                            control={control}
                            label="Đơn Vị"
                            options={donViOptions}
                        ></SelectField>
                        <SelectField
                            name="maloai"
                            control={control}
                            label="Loại Văn Bản"
                            options={loaiCVOptions}
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
                                name="sotrang"
                                control={control}
                                label="Số Tờ"
                            ></InputField>
                        </Stack>
                        <input
                            type="file"
                            style={{ display: "none" }}
                            id="contained-button-file"
                            onChange={handleChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                            >
                                Upload
                            </Button>
                        </label>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <SelectField
                        name="masocv"
                        control={control}
                        label="Sổ Công Văn"
                        options={soCVOptions}
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
                        <SelectField
                            name="malv"
                            control={control}
                            label="Lĩnh vực"
                            options={linhVucOptions}
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
                        name="hanxuli"
                        control={control}
                        label="Hạn Xử Lí"
                        type="date"
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
