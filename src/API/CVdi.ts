import { ListParams } from "../Model/Commom";
import { ICVDi } from "../Model/CVDiModel";
import { IDuThaoVanBanDi } from "./../Components/CVdi/DuThaoVanBanDi";
import axiosClient from "./axiosClient";
import { ResponseStatus } from "./SoCV";

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
    },
    xulytt(mavbdi : number) : Promise<ResponseStatus> {
        const url = `/cvdi/xulytrangthai/${mavbdi}`;
        return axiosClient.post(url);
    }
};

export default cvDiApi;
