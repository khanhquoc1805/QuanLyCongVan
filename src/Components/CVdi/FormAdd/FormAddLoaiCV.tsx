import React, { ReactElement } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Stack } from "@mui/material";
import { InputField } from "../../FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import loaiCVApi, { AddLoaiCV, ResponseAddLoaiCV } from "../../../API/LoaiCV";

const initialValue: AddLoaiCV = {
    tenloai: "",
};

const schema = yup.object().shape({
    tenloai: yup.string().required("Tên loại công văn không hợp lệ."),
});

export default function FormAddLoaiCV(props: any) {
    const { open, setOpen } = props;

    const { control, handleSubmit } = useForm<AddLoaiCV>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleSubmitForm = async (formValues: AddLoaiCV) => {
        const response: ResponseAddLoaiCV = await loaiCVApi.addLoaiCV(
            formValues
        );
        console.log(response);
        if (response.status === "successfully") setOpen(false);
    };
    return (
        <Dialog open={open} fullWidth>
            <Stack direction="row" justifyContent="space-between">
                <DialogTitle>Thêm Loại Công Văn</DialogTitle>
                <Button
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <img
                        src="/cancel-svgrepo-com.svg"
                        alt=""
                        style={{ width: "24px", height: "24px" }}
                    />
                </Button>
            </Stack>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <Stack
                    direction="column"
                    spacing={3}
                    sx={{ width: "80%", margin: "0 auto" }}
                >
                    <InputField
                        name="tenloai"
                        control={control}
                        label="Tên loại công văn"
                    ></InputField>
                </Stack>
                <Stack direction="row" justifyContent="center" mb={4} mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        sx={{ width: "120px" }}
                        type="submit"
                    >
                        Xác Nhận
                    </Button>
                </Stack>
            </form>
        </Dialog>
    );
}
