import { StringLocale } from "yup/lib/locale";
import axiosClient from "./axiosClient";

export interface NhanVien {
    manv: string;
    tennv?: string;
}

const NhanVienAPI = {
    getNhanVien(): Promise<[NhanVien]> {
        const url = "/nhanvien";
        return axiosClient.post(url);
    },
    getNhanVienByMadv(madv: number): Promise<[NhanVien]> {
        const url = `/nhanvien/${madv}`;
        return axiosClient.get(url);
    },
    getNhanVienByManv(manv: string): Promise<NhanVien> {
        const url = `/nhanvien/thongtin/${manv}`;
        return axiosClient.get(url);
    },
};

export default NhanVienAPI;
