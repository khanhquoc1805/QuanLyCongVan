import { ListParams } from "../Model/Commom";
import { Demo } from "../Model/Demo";
import axiosClient from "./axiosClient";

const demoApi = {
    getDemo(params: ListParams): Promise<[Demo]> {
        const url = "/demo/truyenthong";
        return axiosClient.get(url, { params });
    },
};

export default demoApi;
