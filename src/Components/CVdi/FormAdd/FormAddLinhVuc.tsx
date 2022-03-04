import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import linhVucApi, {
    AddLinhVuc,
    ResponseAddLinhVuc
} from "../../../API/LinhVuc";
import { InputField } from "../../FormField";

const initialValue: AddLinhVuc = {
    tenlv: "",
};

const schema = yup.object().shape({
    tenlv: yup.string().required("Tên lĩnh vực không hợp lệ."),
});

export default function FormAddLinhVuc(props: any) {
    const { open, setOpen } = props;

    const { control, handleSubmit } = useForm<AddLinhVuc>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleSubmitForm = async (formValues: AddLinhVuc) => {
        const response: ResponseAddLinhVuc = await linhVucApi.addLinhVuc(
            formValues
        );
        console.log(response);
        if (response.status === "successfully") setOpen(false);
    };
    return (
        <Dialog open={open} fullWidth>
            <Stack direction="row" justifyContent="space-between">
                <DialogTitle>Thêm Lĩnh Vực</DialogTitle>
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
                        name="tenlv"
                        control={control}
                        label="Tên lĩnh vực"
                    ></InputField>
                </Stack>
                <Stack direction="row" justifyContent="center" mb={4} mt={2}>
                    <Button
                        variant="contained"
                        color="secondary"
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
