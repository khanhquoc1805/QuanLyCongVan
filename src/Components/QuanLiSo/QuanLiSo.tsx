import { yupResolver } from "@hookform/resolvers/yup";
import { OutlinedInput, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import soCVApi from "../../API/SoCV";
import { useAppDispatch } from "../../App/hooks";
import { soCVActions } from "../../features/SoCV/SoCVSlice";
import { ISoCV } from "../../Model/SoCV";
import { InputField, SelectField } from "../FormField";
import TableManage from "./TableManage";

const initialValue: ISoCV = {
    masocv: "",
    tensocv: "",
    nhomsocv: "",
    donvi: "",
};

const schema = yup.object().shape({
    masocv: yup.string().required("Mã Văn Bản Không Được Để Trống"),
    tensocv: yup.string().required("Tên Văn Bản Không Được Trống"),
});

export default function QuanLiSo() {
    const [open, setOpen] = useState<boolean>(false);
    const searchRef = useRef<HTMLInputElement>();

    const dispatch = useAppDispatch();
    const { control, handleSubmit } = useForm<ISoCV>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleSubmitForm = async (formValues: ISoCV) => {
        try {
            const res = await soCVApi.addSoCV(formValues);
            if (res.status === "success") {
                dispatch(soCVActions.fetchData({ page: 1, limit: 5 }));
                toast.success("Thêm sổ công văn thành công !", {
                    position: "top-center",
                    autoClose: 1500,
                });
            }
        } catch (error) {}
        setOpen(false);
    };

    return (
        <div style={{ margin: "0 40px 0 40px" }}>
            <div>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div
                        style={{
                            margin: "24px 0 0 40px",
                            fontSize: "36px",
                            fontWeight: "bold",
                            color: "#F73B07",
                            fontFamily: "coiny",
                        }}
                    >
                        QUẢN LÝ SỔ CÔNG VĂN
                    </div>
                    <Stack
                        direction="row"
                        spacing={3}
                        justifyContent="right"
                        mt={3}
                    >
                        <Link
                            to="/home"
                            style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "black",
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{ cursor: "pointer" }}
                            >
                                <div>
                                    <img
                                        src="home-svgrepo-com.svg"
                                        alt=""
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                        }}
                                    />
                                </div>
                                <p>Trang Chủ</p>
                            </Stack>
                        </Link>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ cursor: "pointer" }}
                        >
                            <div>
                                <img
                                    src="urgent-svgrepo-com.svg"
                                    alt=""
                                    style={{ width: "20px", height: "20px" }}
                                />
                            </div>
                            <p>Độ khẩn</p>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ cursor: "pointer" }}
                        >
                            <div>
                                <img
                                    src="security-lock-svgrepo-com.svg"
                                    alt=""
                                    style={{ width: "20px", height: "20px" }}
                                />
                            </div>
                            <p>Độ Mật</p>
                        </Stack>

                        <div style={{ cursor: "pointer" }}>Sổ Công Văn</div>
                    </Stack>
                </div>

                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ position: "absolute", right: "40px", top: "72px" }}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Thêm Mới
                </Button>
                <Stack sx={{ height: "48px" }}></Stack>
                <Stack mt={4} mb={3} direction="row" spacing={2}>
                    <FormControl
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ width: "500px" }}
                    >
                        <InputLabel htmlFor="searchByName">
                            Search By Name
                        </InputLabel>
                        <OutlinedInput
                            label="Search By Name"
                            id="searchByName"
                            //   endAdornment={<SearchIcon />}
                            //   onChange={handleSearchChange}
                            inputRef={searchRef}
                        />
                    </FormControl>
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ width: "140px" }}
                    >
                        Tìm Kiếm
                    </Button>
                </Stack>
                <TableManage></TableManage>

                <Dialog open={open} fullWidth>
                    <Stack direction="row" justifyContent="space-between">
                        <DialogTitle>Thêm Sổ Công Văn</DialogTitle>
                        <Button
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <img
                                src="cancel-svgrepo-com.svg"
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
                                name="masocv"
                                control={control}
                                label="Mã Sổ Công Văn"
                            ></InputField>
                            <InputField
                                name="tensocv"
                                control={control}
                                label="Mã Sổ Công Văn"
                            ></InputField>
                            <SelectField
                                name="nhomsocv"
                                control={control}
                                label="Nhóm sổ công văn"
                                options={[
                                    { label: "Văn Bản Đi", value: "Văn Bản Đi" },
                                    { label: "Văn Bản Đến", value: "Văn Bản Đến" },
                                ]}
                            ></SelectField>
                            <SelectField
                                name="donvi"
                                control={control}
                                label="Đơn vị"
                                options={[
                                    {
                                        label: "Phòng Kế Hoạch Tổng Hợp",
                                        value: "Phòng Kế Hoạch Tổng Hợp",
                                    },
                                    {
                                        label: "Khoa Công Nghệ Thông Tin",
                                        value: "Khoa Công Nghệ Thông Tin",
                                    },
                                ]}
                            ></SelectField>
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            mb={4}
                            mt={2}
                        >
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
            </div>
        </div>
    );
}
