import { IXuly } from "../Components/CVden/Tabs/XuLy";
import { ListParams } from "../Model/Commom";
import { ICVDen, InfoXuLy } from "../Model/CVDenModel";
import axiosClient from "./axiosClient";

const cvDenApi = {
    getCVDen(params: ListParams): Promise<[ICVDen]> {
        const url = "/cvden";
        return axiosClient.get(url, { params });
    },
    getCVDenById(macvden: string): Promise<ICVDen> {
        const url = `/cvden/${macvden}`;
        return axiosClient.get(url);
    },
    add(formData: FormData): Promise<any> {
        const url = "/cvden/add";
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    phanCongXuLyCVDen(formValues: IXuly): Promise<any> {
        const url = "/xuly/add";
        return axiosClient.post(url, formValues);
    },

    getInfoXuLy(macvden: string): Promise<[InfoXuLy]> {
        const url = `/xuly/${macvden}`;
        return axiosClient.get(url);
    },
    hoanThanhXuLy(formValue: { manv: string; macvden: string }): Promise<any> {
        const url = "/xuly/hoanthanhxuly";
        return axiosClient.post(url, formValue);
    },
    xacNhanQuyenXuLy(formvalue: {
        manv: string;
        macvden: string;
    }): Promise<any> {
        const url = "/xuly/thongtinxuly/xacnhanquyenxuly";
        return axiosClient.post(url, formvalue);
    },
};

export default cvDenApi;
