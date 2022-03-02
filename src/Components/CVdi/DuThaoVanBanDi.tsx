import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import cvDiApi from "../../API/CVdi";
import donViApi, { IDonVi } from "../../API/DonVi";
import linhVucApi, { AddLinhVuc, ILinhVuc } from "../../API/LinhVuc";
import loaiCVApi, { ILoaiCV } from "../../API/LoaiCV";
import { getCurrentDate } from "../../Utils/getCurrentDate";
import { InputField, SelectField, SelectOption } from "../FormField";
import FormAddLinhVuc from "./FormAdd/FormAddLinhVuc";
import FormAddLoaiCV from "./FormAdd/FormAddLoaiCV";

export interface IDuThaoVanBanDi {
    madv: string;
    maloai: string;
    tenvbdi: string;
    dinhkem: File;
    dokhan: string;
    domat: string;
    malv: string;
    sotrang: number;
    thuchientheovanban: string;
    ngayravbdi: string;
}

const initialValue: IDuThaoVanBanDi = {
    madv: "",
    maloai: "",
    tenvbdi: "",
    dinhkem: new File([""], "filename"),
    dokhan: "",
    domat: "",
    malv: "",
    sotrang: 0,
    thuchientheovanban: "",
    ngayravbdi: getCurrentDate(),
};

const schema = yup.object().shape({
    madv: yup.string().required("Vui lòng chọn đơn vị."),
    maloai: yup.string().required("Vui lòng chọn loại văn bản."),
    ngayravbdi: yup.date().required("Vui lòng chọn ngày ra văn bản"),
    tenvbdi: yup.string().required("Trích Yếu Văn Bản Không Được Để Trống"),
    sotrang: yup
        .number()
        .min(1, "Số trang không được bằng 0")
        .max(100)
        .required()
        .typeError("Số trang là một số nguyên dương."),
    dokhan: yup.string().required("Vui lòng chọn độ khẩn."),
    domat: yup.string().required("Vui lòng chọn loại độ mật."),
    malv: yup.string().required("Vui lòng chọn lĩnh vực."),
});

export default function DuThaoVanBanDi() {
    const { control, handleSubmit } = useForm<IDuThaoVanBanDi>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const [linhVuc, setLinhVuc] = useState<[ILinhVuc]>([
        { malv: 1, tenlv: "" },
    ]);
    const [loaiCV, setLoaiCV] = useState<[ILoaiCV]>([
        { maloai: 1, tenloai: "" },
    ]);

    const [donVi, setDonVi] = useState<[IDonVi]>([{ madv: 1, tendv: "" }]);
    const [openAddLV, setOpenAddLV] = useState<boolean>(false);
    const [openAddLoaiCV, setOpenAddLoaiCV] = useState<boolean>(false);

    const [fileUpload, setFileUpload] = useState<File>(
        new File([""], "filename")
    );

    useEffect(() => {
        (async () => {
            const linhvuc = await linhVucApi.getLinhVuc();
            setLinhVuc(linhvuc);
            const loaicv = await loaiCVApi.getLoaiCV();
            setLoaiCV(loaicv);
            const donvi = await donViApi.getDonVi();
            setDonVi(donvi);
        })();
    }, [openAddLV, openAddLoaiCV]);

    const linhVucOptions: SelectOption[] = linhVuc?.map((lv) => ({
        label: lv.tenlv,
        value: lv.malv,
    }));

    const loaiCVOptions: SelectOption[] = loaiCV?.map((lcv) => ({
        label: lcv.tenloai,
        value: lcv.maloai,
    }));

    const donViOptions: SelectOption[] = donVi?.map((dv) => ({
        label: dv.tendv,
        value: dv.madv,
    }));

    const handleChange = (event: any) => {
        setFileUpload(event.target.files[0]);
    };

    const handleSubmitForm = async (formValues: IDuThaoVanBanDi) => {
        formValues.dinhkem = fileUpload;
        //console.log(formValues);
        const formData = new FormData();
        formData.append("madv", formValues.madv);
        formData.append("maloai", formValues.maloai);
        formData.append("tenvbdi", formValues.tenvbdi);
        formData.append("dinhkem", formValues.dinhkem);
        formData.append("dokhan", formValues.dokhan);
        formData.append("domat", formValues.domat);
        formData.append("malv", formValues.malv);
        formData.append("sotrang", formValues.sotrang.toString());
        formData.append("thuchientheovanban", formValues.thuchientheovanban);
        formData.append("ngayravbdi", formValues.ngayravbdi);
        console.log(formValues);

        const response = await cvDiApi.add(formData);
    };

    const handleClickAddLV = () => {
        setOpenAddLV(true);
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
                        name="madv"
                        control={control}
                        label="Đơn Vị"
                        options={donViOptions}
                    ></SelectField>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <SelectField
                            name="maloai"
                            control={control}
                            label="Loại Công Văn"
                            options={loaiCVOptions}
                        ></SelectField>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            sx={{ height: "56px", margin: "7px 0px 0px 12px" }}
                            onClick={() => {
                                setOpenAddLoaiCV(true);
                            }}
                        >
                            Thêm
                        </Button>
                    </div>
                    <InputField
                        name="tenvbdi"
                        control={control}
                        label="Trích Yếu"
                    ></InputField>
                    <InputField
                        name="ngayravbdi"
                        control={control}
                        label="Ngày ra công văn"
                        type="date"
                    ></InputField>
                    {/* <InputField
                        name="dinhkem"
                        control={control}
                        label="Tập Tin Đính Kèm"
                        type="file"
                    ></InputField> */}
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
                        <SelectField
                            name="malv"
                            control={control}
                            label="Lĩnh vực"
                            //options={linhVucOption}
                            options={linhVucOptions}
                        ></SelectField>

                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            sx={{ height: "56px", margin: "7px 0px 0px 12px" }}
                            onClick={handleClickAddLV}
                        >
                            Thêm
                        </Button>
                    </div>
                    <InputField
                        name="sotrang"
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
            <FormAddLinhVuc
                open={openAddLV}
                setOpen={setOpenAddLV}
            ></FormAddLinhVuc>
            <FormAddLoaiCV
                open={openAddLoaiCV}
                setOpen={setOpenAddLoaiCV}
            ></FormAddLoaiCV>
        </form>
    );
}
