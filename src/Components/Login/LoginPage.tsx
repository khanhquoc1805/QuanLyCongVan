import {
    Button,
    FilledInput,
    FormControl,
    InputAdornment,
    InputLabel,
    Paper,
    Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
    authActions,
    selectAccessToken,
    selectBoPhanAuth,
    selectDonViAuth,
    selectManv,
} from "../../features/Auth/authSlice";
import { InputField } from "../FormField";
import { NavLink, useNavigate } from "react-router-dom";

export interface Login {
    manv: string;
    matkhau: string;
}

const initialValue: Login = {
    manv: "",
    matkhau: "",
};

export default function LoginPage() {
    const navigate = useNavigate();
    const manv = useAppSelector(selectManv);
    const bophan = useAppSelector(selectBoPhanAuth);
    const donvi = useAppSelector(selectDonViAuth);
    const { control, handleSubmit } = useForm<Login>({
        defaultValues: initialValue,
    });
    const dispatch = useAppDispatch();

    const handleSubmitForm = async (formValues: Login) => {
        dispatch(authActions.login(formValues));
    };
    useEffect(() => {
        if (manv !== undefined && manv !== "") {
            
            navigate("/home");
           
        }
    }, [manv]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background:
                    "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)",
            }}
        >
            <Paper sx={{ maxWidth: "500px", borderRadius: "16px" }}>
                <div
                    style={{
                        fontFamily: "Coiny",
                        fontSize: "32px",
                        fontWeight: "bolder",
                        color: "white",
                        textAlign: "center",
                        // margin: "8px 0px 8px 0px",
                        backgroundColor: "#ED1A1E",
                        borderRadius: "16px 16px 0px 0px",
                        padding: "16px",
                    }}
                >
                    Đăng Nhập
                </div>
                <form
                    style={{ padding: "32px", backgroundColor: "" }}
                    onSubmit={handleSubmit(handleSubmitForm)}
                >
                    <InputField
                        name="manv"
                        control={control}
                        label="Tài Khoản"
                    ></InputField>
                    <InputField
                        name="matkhau"
                        control={control}
                        label="Mật Khẩu"
                        type="password"
                    ></InputField>
                    <div style={{ textAlign: "center", marginTop: "24px" }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                            Đăng Nhập
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
}
