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
};
export default cvDiApi;
