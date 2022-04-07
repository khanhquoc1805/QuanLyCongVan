import axiosClient from "./axiosClient";
import { ListParams } from "../Model/Commom";
import { ISoCV } from "../Model/SoCV";

export interface ResponseStatus {
    status: string;
    massage?: string; 
}

const soCVApi = {
    getSoCV(params: ListParams): Promise<any> {
        const url = "/socv";
        return axiosClient.get(url, { params });
    },
    addSoCV(formValues: ISoCV): Promise<any> {
        const url = "/socv/add";
        return axiosClient.post(url, formValues);
    },
    deleteSoCV(masocv: string): Promise<ResponseStatus> {
        const url = `/socv/delete/${masocv}`;
        return axiosClient.get(url);
    },
};

export default soCVApi;
