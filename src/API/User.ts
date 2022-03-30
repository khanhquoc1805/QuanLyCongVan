import { BaseNV, IUser } from "./../Model/User";
import { ListParams } from "../Model/Commom";
import axiosClient from "./axiosClient";

const userApi = {
    getUser(params: ListParams): Promise<[IUser]> {
        const url = "/user";
        return axiosClient.get(url, { params });
    },
    addUser(formValue: BaseNV): Promise<any> {
        const url = "/user/add";
        return axiosClient.post(url, formValue);
    },
};

export default userApi;
