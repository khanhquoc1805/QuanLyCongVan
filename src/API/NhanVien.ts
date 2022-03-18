import { StringLocale } from "yup/lib/locale";
import axiosClient from "./axiosClient";

export interface NhanVien {
    manv: string;
    tennv?: string;
}

const NhanVienAPI = {
    getNhanVien(): Promise<[NhanVien]> {
        const url = "nhanvien";
        return axiosClient.post(url);
    },
};

export default NhanVienAPI;
