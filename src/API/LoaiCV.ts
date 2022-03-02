import axiosClient from "./axiosClient";

export interface ILoaiCV {
    maloai: number;
    tenloai: string;
}

export interface AddLoaiCV {
    tenloai: string;
}

export interface ResponseAddLoaiCV {
    status: string;
}

const loaiCVApi = {
    getLoaiCV(): Promise<[ILoaiCV]> {
        const url = "/loaicv";
        return axiosClient.get(url);
    },
    addLoaiCV(formValues: AddLoaiCV): Promise<ResponseAddLoaiCV> {
        const url = "/loaicv/add";
        return axiosClient.post(url, formValues);
    },
};

export default loaiCVApi;
