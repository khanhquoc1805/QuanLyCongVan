import { StringLocale } from "yup/lib/locale";
import { ILinhVuc } from "./../API/LinhVuc";
import { ILoaiCV } from "./../API/LoaiCV";
import { IDonVi } from "./../API/DonVi";
import { ISoCV } from "./SoCV";
export interface ICVDen {
    cvden: BaseCVden;
    ttbosung: TTCVden;
    donvi: IDonVi;
    loaicv: ILoaiCV;
    linhvuc: ILinhVuc;
}

export interface BaseCVden {
    macvden: number;
    tencvden: string;
    soden: number;
    ngaycohieuluc: Date;
    ngayhethieuluc: Date;
    ngayracv: Date;
    ngaycvden: Date;
    ngayvaoso: Date;
    ngaybanhanh: Date;
    nguoiky: string;
    xuly: string;
    hanxuli?: string;
    coquanbanhanh: string;
    noinhan: string;
    sohieugoc: string;
    mabp: string;
    manv: string;
    masocv: string;
    maloai: string;
    matt: number;
    matc: string;
}

export interface TTCVden {
    matt: number;
    sotrang: number;
    dinhkem: string;
    dokhan: string;
    domat: string;
    khac: string;
}

export interface XuLy {
    manv: string;
    macvden: number;
    trangthai: string;
    butphe: string;
    hanxuly: string;
    vaitro: string;
}
export interface NV {
    tennv: string;
    chucvu: string;
}
export interface InfoXuLy {
    xuly: XuLy;
    nv: NV;
}
