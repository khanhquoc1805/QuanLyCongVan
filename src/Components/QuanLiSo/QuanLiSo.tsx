import { yupResolver } from "@hookform/resolvers/yup";
import { OutlinedInput, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import donViApi, { IDonVi } from "../../API/DonVi";
import soCVApi from "../../API/SoCV";
import { useAppDispatch } from "../../App/hooks";
import { soCVActions } from "../../features/SoCV/SoCVSlice";
import { ISoCV } from "../../Model/SoCV";
import MyBreadcrumbs, { IMyBreadcrumbs } from "../Breadcrumbs/MyBreadcrumbs";
import { InputField, SelectField, SelectOption } from "../FormField";
import TableManage from "./TableManage";

const initialValue: ISoCV = {
    masocv: "",
    tensocv: "",
    nhomsocv: "",
    madv: "",
};

const schema = yup.object().shape({
    masocv: yup.string().required("Mã Văn Bản Không Được Để Trống"),
    tensocv: yup.string().required("Tên Văn Bản Không Được Trống"),
});

export default function QuanLiSo() {
    const token = localStorage.getItem("access_token");
    const [open, setOpen] = useState<boolean>(false);
    const [donVi, setDonVi] = useState<[IDonVi]>([{ madv: 1, tendv: "" }]);
    const searchRef = useRef<HTMLInputElement>();
    const location = useLocation();

    const breadcrumbs: IMyBreadcrumbs[] = location.pathname
        .split("/")
        .map((route) => {
            if (route === "") {
                return { title: "Home", link: "home" };
            }
            return { title: route, link: route };
        });

    const dispatch = useAppDispatch();
    const { control, handleSubmit } = useForm<ISoCV>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
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

    return token ? (
        <div
            style={
                {
                    // background:
                    //     "-webkit-radial-gradient(center, ellipse cover,  rgba(16, 0, 36, 0.03) 1%,rgba(98, 108, 166, 0.2) 100%)" /* Chrome10+,Safari5.1+ */,
                    // filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#D378E2', endColorstr='#460253',GradientType=1 )" /* IE6-9 fallback on horizontal gradient */,
                    // height: "calc(100vh)",
                    // width: "100%",
                }
            }
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundImage:
                        "linear-gradient(0deg,rgb(255,255,255),#90a4ae)",
                    padding: "0 40px 16px 40px",
                }}
            >
                <div
                    style={{
                        margin: "24px 0 0 40px",
                        fontSize: "36px",
                        fontWeight: "bold",
                        color: "#37474f",
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
                                        width: "26px",
                                        height: "26px",
                                    }}
                                />
                            </div>
                            <p style={{ fontSize: "20px" }}>Trang Chủ</p>
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
                                style={{ width: "26px", height: "26px" }}
                            />
                        </div>
                        <p style={{ fontSize: "20px" }}>Độ khẩn</p>
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
                                style={{ width: "26px", height: "26px" }}
                            />
                        </div>
                        <p style={{ fontSize: "20px" }}>Độ Mật</p>
                    </Stack>

                    <div style={{ cursor: "pointer", fontSize: "20px" }}>
                        Sổ Công Văn
                    </div>
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

            <Stack sx={{ height: "48px" }}>
                <MyBreadcrumbs color="#607d8b"></MyBreadcrumbs>
            </Stack>
            <div
                style={{
                    padding: "0px 40px 0px 80px",
                }}
            >
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
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                       
                    >
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
                    <form
                        onSubmit={handleSubmit(handleSubmitForm)}
                        
                    >
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
                                label="Tên Sổ Công Văn"
                            ></InputField>
                            <SelectField
                                name="nhomsocv"
                                control={control}
                                label="Nhóm sổ công văn"
                                options={[
                                    {
                                        label: "Văn Bản Đi",
                                        value: "Văn Bản Đi",
                                    },
                                    {
                                        label: "Văn Bản Đến",
                                        value: "Văn Bản Đến",
                                    },
                                ]}
                            ></SelectField>
                            <SelectField
                                name="madv"
                                control={control}
                                label="Đơn vị"
                                options={donViOptions}
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
    ) : (
        <></>
    );
}
