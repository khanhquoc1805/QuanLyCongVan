import { Login } from "../Components/Login/LoginPage";
import { UserPayload } from "../features/Auth/authSlice";
import axiosClient from "./axiosClient";

const authApi = {
    login(userCredential: Login): Promise<UserPayload> {
        const url = "/auth/dangnhap";
        return axiosClient.post(url, userCredential);
    },
};

export default authApi;
