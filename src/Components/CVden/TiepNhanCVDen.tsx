import { Button, Grid, Stack } from "@mui/material";
import React, { useState, useEffect, RefObject, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
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
import draftCVDen from "../../API/DraftCVDen";
import {
    changeDateFromString,
    getDateFromString,
} from "../../Utils/getDateFromString";
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
    dinhkem: File;
    masocv: string;
    ngayden: string;
    dokhan: string;
    domat: string;
    malv: string;
    hanxuli: string;
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
    dinhkem: new File([""], ""),
    masocv: "",
    ngayden: getCurrentDate(),
    dokhan: "",
    domat: "",
    malv: "",
    hanxuli: getCurrentDate(),
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

const schema1 = yup.object().shape({
    madv: yup.string(),
    maloai: yup.string(),
    coquanbanhanh: yup.string(),
    trichyeu: yup.string(),
    malv: yup.string(),
    masocv: yup.string(),
    dokhan: yup.string(),
    domat: yup.string(),
    hanxuli: yup.date(),
});

export default function TiepNhanCVDen() {
    const dispatch = useAppDispatch();
    const dssocv = useAppSelector(selectDsSoCV);
    const { iddraft } = useParams<{ iddraft: string }>();
    const is_draft = Boolean(iddraft);

    const buttonRef: RefObject<HTMLButtonElement> = useRef(null);
    const [isDraft, setIsDraft] = useState<boolean>(false);

    const { control, handleSubmit, setValue } = isDraft
        ? useForm<TiepNhanCVDen>({
              defaultValues: initialValue,
              resolver: yupResolver(schema1),
          })
        : useForm<TiepNhanCVDen>({
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
    const [draft, setDraft] = useState<TiepNhanCVDen>();

    const manv = localStorage.getItem("manv");

    useEffect(() => {
        if (!iddraft) return;

        (async () => {
            try {
                const data: TiepNhanCVDen = await draftCVDen.getById(iddraft);
                setDraft(data);
            } catch (error) {
                console.log("Failed to fetch", error);
            }
        })();
    }, [iddraft]);

    useEffect(() => {
        // console.log(draft);
        setValue("malv", draft?.malv?.toString() || "");
        setValue("madv", draft?.madv?.toString() || "");
        setValue("maloai", draft?.maloai?.toString() || "");
        setValue("dokhan", draft?.dokhan?.toString() || "");
        setValue("domat", draft?.domat?.toString() || "");
        setValue("trichyeu", draft?.trichyeu?.toString() || "");
        setValue("sohieugoc", draft?.sohieugoc?.toString() || "");
        setValue("coquanbanhanh", draft?.coquanbanhanh?.toString() || "");
        setValue("nguoiky", draft?.nguoiky?.toString() || "");
        setValue("masocv", draft?.masocv?.toString() || "");
        setValue(
            "hanxuli",
            changeDateFromString(draft?.hanxuli?.toString() || "")
        );
        setValue(
            "ngaybanhanh",
            changeDateFromString(draft?.ngaybanhanh?.toString() || "")
        );
        setValue(
            "ngaycohieuluc",
            changeDateFromString(draft?.ngaycohieuluc?.toString() || "")
        );
        setValue(
            "ngayhethieuluc",
            changeDateFromString(draft?.ngayhethieuluc?.toString() || "")
        );
        setValue(
            "ngayden",
            changeDateFromString(draft?.ngayden?.toString() || "")
        );
    }, [draft, iddraft]);

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
       

        // setValue("malv", "");
        // setValue("madv", "");
        // setValue("maloai", "");
        // setValue("dokhan", "");
        // setValue("domat", "");
        // setValue("trichyeu", "");
        // setValue("sohieugoc", "");
        // setValue("coquanbanhanh", "");
        // setValue("nguoiky", "");
        // setValue("masocv", "");
        setValue("hanxuli", getCurrentDate());
        setValue("ngaybanhanh", getCurrentDate());
        setValue("ngaycohieuluc", getCurrentDate());
        setValue("ngayhethieuluc", getCurrentDate());
        setValue("ngayden", getCurrentDate());
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
            "dinhkem",
            "masocv",
            "ngayden",
            "dokhan",
            "domat",
            "malv",
            "hanxuli",
        ];

        keys.forEach((key) => formData.append(key, formValues[key]));
        if (isDraft === false) {
            const response = await cvDenApi.add(formData);
            console.log(response);
            if (response.status === "successfully") setAlert(true);
        } else {
            formData.append("manv", manv || "");
            formData.append("iddraft", iddraft || "");
            //for (const v of formData.values()) console.log(v);

            const response = await draftCVDen.add(formData);
            console.log(response);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleSubmitForm)}
            style={{ marginTop: "24px", marginBottom: "48px" }}
        >
            <div
                style={{
                    fontSize: "28px",
                    textAlign: "center",
                    color: "blue",
                    fontFamily: "Roboto,Helvetica,Arialsans-serif",
                }}
            >
                Tiếp nhận văn bản
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
                                    value: "Khẩn",
                                },
                                {
                                    label: "Bình Thường",
                                    value: "Bình Thường",
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
                                    value: "Bảo Mật",
                                },
                                {
                                    label: "Bình Thường",
                                    value: "Bình Thường",
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

                    <Stack direction="row">
                        <InputField
                            name="nguoiky"
                            control={control}
                            label="Người Ký"
                        ></InputField>
                        {/* <InputField
                            name="sotrang"
                            control={control}
                            label="Số Tờ"
                        ></InputField> */}
                        <InputField
                            name="hanxuli"
                            control={control}
                            label="Hạn Xử Lí"
                            type="date"
                        ></InputField>
                    </Stack>
                    {/* <input
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
                    </label> */}

                    <div>
                        <input
                            type="file"
                            style={{
                                border: "1px solid #c6c6c6",
                                width: "100%",
                                height: "54px",
                                borderRadius: "4px",
                                boxSizing: "border-box",
                                padding: "12px 0px 0px 44px",
                                marginTop: "14px",
                            }}
                            id="contained-button-file"
                            onChange={handleChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                sx={{
                                    position: "relative",
                                    top: "-48px",
                                    left: "12px",
                                }}
                            >
                                Đính kèm
                            </Button>
                        </label>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gridGap: "12px",
                            justifyContent: "flex-end",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(e) => {
                                    setIsDraft(true);
                                    setTimeout(() => {
                                        buttonRef.current!.click();
                                    }, 1);
                                }}
                            >
                                Lưu lại
                            </Button>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                // type="submit"
                                onClick={(e) => {
                                    setIsDraft(false);
                                    setTimeout(() => {
                                        buttonRef.current!.click();
                                    }, 1);
                                }}
                            >
                                Tiếp Tục
                            </Button>
                        </div>
                    </div>

                    {/* <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                            Tiếp Tục
                        </Button>
                    </div> */}
                </Grid>

                <div
                    style={{
                        display: "none",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        ref={buttonRef}
                    >
                        Real submit
                    </Button>
                </div>
            </Grid>
        </form>
    );
}
