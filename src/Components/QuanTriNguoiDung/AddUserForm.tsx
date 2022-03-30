import { Button } from "@mui/material";
import { Box, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import donViApi, { IDonVi } from "../../API/DonVi";
import { BaseNV, IUser } from "../../Model/User";
import { InputField, SelectField, SelectOption } from "../FormField";

interface AddUserFormProps {
    initialValue?: BaseNV;
    onSubmit?: (formValues: BaseNV) => void;
}
export default function AddUserForm(props: AddUserFormProps) {
    const { initialValue, onSubmit } = props;
    const [donVi, setDonVi] = useState<[IDonVi]>([{ madv: 1, tendv: "" }]);
    const { control, handleSubmit } = useForm<BaseNV>({
        defaultValues: initialValue,
        // resolver: yupResolver(schema),
    });

    useEffect(() => {
        (async () => {
            const donvi = await donViApi.getDonVi();
            setDonVi(donvi);
        })();
    }, []);

    const donViOptions: SelectOption[] = donVi?.map((dv) => ({
        label: dv.tendv,
        value: dv.madv,
    }));

    const handleSubmitForm = async (formValues: BaseNV) => {
        console.log(formValues);
        try {
            await onSubmit?.(formValues);
        } catch (error) {}
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <InputField name="manv" control={control} label="Mã Người dùng" />

            <InputField name="tennv" control={control} label="Tên Người dùng" />
            <InputField
                name="matkhau"
                control={control}
                label="Mật khẩu"
                type="password"
            />

            <Stack direction="row">
                {" "}
                <InputField
                    name="sdt"
                    control={control}
                    label="Số Điện Thoại"
                />
                <InputField
                    name="ngaysinh"
                    control={control}
                    label="Ngày Sinh"
                    type="date"
                />
            </Stack>
            <InputField name="diachi" control={control} label="Địa Chỉ" />
            <Stack direction="row">
                <SelectField
                    name="chucvu"
                    control={control}
                    label="Chức vụ"
                    options={[
                        {
                            label: "Văn Thư",
                            value: "Văn Thư",
                        },
                        {
                            label: "Cán Bộ",
                            value: "Cán Bộ",
                        },
                        {
                            label: "Phó Khoa",
                            value: "Phó Khoa",
                        },
                        {
                            label: "Trưởng Khoa",
                            value: "Trưởng Khoa",
                        },
                    ]}
                ></SelectField>
                <SelectField
                    name="quyen"
                    control={control}
                    label="Quyền Hạn"
                    options={[
                        {
                            label: "Văn Thư",
                            value: "vanthu",
                        },
                        {
                            label: "Cán Bộ",
                            value: "canbo",
                        },
                        {
                            label: "Lãnh Đạo",
                            value: "lanhdao",
                        },
                    ]}
                ></SelectField>
            </Stack>
            <SelectField
                name="madv"
                control={control}
                label="Đơn Vị"
                options={donViOptions}
            ></SelectField>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" color="primary" type="submit">
                    Thêm Người Dùng
                </Button>
            </div>
        </form>
    );
}
