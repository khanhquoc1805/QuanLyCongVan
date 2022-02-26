import axiosClient from "./axiosClient";

export interface ILinhVuc {
    malv: number;
    tenlv: string;
}

const linhVucApi = {
    getLinhVuc(): Promise<[ILinhVuc]> {
        const url = "/linhvuc";
        return axiosClient.get(url);
    },
};

export default linhVucApi;
