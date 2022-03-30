import { IUser } from "./../Model/User";
import { ListParams } from "../Model/Commom";
import axiosClient from "./axiosClient";

const userApi = {
    getUser(params: ListParams): Promise<[IUser]> {
        const url = "/user";
        return axiosClient.get(url, { params });
    },
};

export default userApi;
