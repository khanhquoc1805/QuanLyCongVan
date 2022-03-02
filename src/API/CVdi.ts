import { ListParams } from "../Model/Commom";
import { ICVDi } from "../Model/CVDiModel";
import { IDuThaoVanBanDi } from "./../Components/CVdi/DuThaoVanBanDi";
import axiosClient from "./axiosClient";

const cvDiApi = {
    add(formData: FormData): Promise<any> {
        const url = "/cvdi/add";
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    getCVDi(params : ListParams) : Promise<[ICVDi]> {
        const url = "/cvdi";
        return axiosClient.get(url,{params});
    }
};

export default cvDiApi;
