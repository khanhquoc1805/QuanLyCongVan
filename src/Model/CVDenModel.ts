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
    ngaybanhanh : Date;
    nguoiky: string;
    xuly: string;
    hanxuly: string;
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
