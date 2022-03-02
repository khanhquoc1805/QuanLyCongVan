import axiosClient from "./axiosClient";

export interface ILinhVuc {
    malv: number;
    tenlv: string;
}

export interface AddLinhVuc {
    tenlv: string;
}

export interface ResponseAddLinhVuc {
    status: string;
}

const linhVucApi = {
    getLinhVuc(): Promise<[ILinhVuc]> {
        const url = "/linhvuc";
        return axiosClient.get(url);
    },
    addLinhVuc(formValues: AddLinhVuc): Promise<ResponseAddLinhVuc> {
        const url = "/linhvuc/add";
        return axiosClient.post(url, formValues);
    },
};

export default linhVucApi;
