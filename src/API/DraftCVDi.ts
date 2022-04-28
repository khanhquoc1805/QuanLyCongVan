import { DraftCVDi } from "../Model/Draft";
import axiosClient from "./axiosClient";

const draftCVDi = {
    add(formData: FormData): Promise<any> {
        const url = "/draftcvdi/add";
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    get(manv: string): Promise<[DraftCVDi]> {
        const url = `/draftcvdi?manv=${manv}`;
        return axiosClient.get(url);
    },
    getById(iddraft: string): Promise<any> {
        const url = `/draftcvdi/${iddraft}`;
        return axiosClient.get(url);
    },
};

export default draftCVDi;
