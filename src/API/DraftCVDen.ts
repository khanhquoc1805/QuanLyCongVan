import { DraftCVDi } from "../Model/Draft";
import axiosClient from "./axiosClient";

const draftCVDen = {
    add(formData: FormData): Promise<any> {
        const url = "/draftcvden/add";
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    get(manv: string | null): Promise<[DraftCVDi]> {
        const url = `/draftcvden?manv=${manv}`;
        return axiosClient.get(url);
    },

    getById(iddraft: string): Promise<any> {
        const url = `/draftcvden/${iddraft}`;
        return axiosClient.get(url);
    },

    delete(iddraft: string): Promise<any> {
        const url = `/draftcvden/delete/${iddraft}`;
        return axiosClient.post(url);
    },
};

export default draftCVDen;
