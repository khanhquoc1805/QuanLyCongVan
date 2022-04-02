import { AddCVVaoSo } from "../Components/CVdi/PhatHanhVanBanDi";
import { ListParams } from "../Model/Commom";
import { ICVDi, ITTXuLyCVDi } from "../Model/CVDiModel";
import { IDuThaoVanBanDi } from "./../Components/CVdi/DuThaoVanBanDi";
import axiosClient from "./axiosClient";
import { ResponseStatus } from "./SoCV";
import { IXuLyCVDi } from "../Components/CVdi/Tabs/XuLyCVDi";

const cvDiApi = {
    add(formData: FormData): Promise<any> {
        const url = "/cvdi/add";
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    getCVDi(params: ListParams): Promise<[ICVDi]> {
        const url = "/cvdi";
        return axiosClient.get(url, { params });
    },
    getCVDiById(mavbdi: string): Promise<ICVDi> {
        const url = `/cvdi/${mavbdi}`;
        return axiosClient.get(url);
    },
    xulytt(mavbdi: number): Promise<ResponseStatus> {
        const url = `/cvdi/xulytrangthai/${mavbdi}`;
        return axiosClient.post(url);
    },
    addCVDiVaoSo(formValues: AddCVVaoSo): Promise<ResponseStatus> {
        const url = `/cvdi/themvaoso/${formValues.mavbdi}`;
        return axiosClient.post(url, formValues);
    },
    chuyenXuLy(formValues: IXuLyCVDi): Promise<any> {
        const url = "/cvdi/chuyenxuly";
        return axiosClient.post(url, formValues);
    },
    xacNhanQuyenXuLyCVDi(formvalue: {
        manv: string;
        mavbdi: string;
    }): Promise<any> {
        const url = "/cvdi/thongtinxuly/xacnhanquyenxuly";
        return axiosClient.post(url, formvalue);
    },
    hoanThanhXuLyCVDi(formValue: {
        manv: string;
        mavbdi: string;
    }): Promise<any> {
        const url = "/cvdi/hoanthanhxuly";
        return axiosClient.post(url, formValue);
    },
    getInfoXuLyCVDi(mavbdi: string): Promise<[ITTXuLyCVDi]> {
        const url = `cvdi/thongtin/${mavbdi}`;
        return axiosClient.get(url);
    },
};

export default cvDiApi;
