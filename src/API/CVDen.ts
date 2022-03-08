import { ListParams } from "../Model/Commom";
import { ICVDen } from "../Model/CVDenModel";
import axiosClient from "./axiosClient";

const cvDenApi = {
    getCVDen(params: ListParams): Promise<[ICVDen]> {
        const url = "/cvden";
        return axiosClient.get(url, { params });
    },

    add(formData: FormData): Promise<any> {
        const url = "/cvden/add";
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default cvDenApi;
