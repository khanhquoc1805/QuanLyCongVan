import { ListParams } from "../Model/Commom";
import { ITraCuu } from "../Model/TraCuuModel";
import axiosClient from "./axiosClient";

const traCuuApi = {
    getDataTraCuu(params: ListParams): Promise<[ITraCuu]> {
        const url = "/tracuu";
        return axiosClient.get(url, { params });
    },
};

export default traCuuApi;
