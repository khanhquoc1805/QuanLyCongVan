import { IDonVi } from "../API/DonVi";
import { ILinhVuc } from "../API/LinhVuc";
import { ILoaiCV } from "../API/LoaiCV";
import { TTCVden } from "./CVDenModel";

export interface TraCuuData {
    macvden?: number;
    tencvden?: string;
    soden?: number;
    ngaycohieuluc?: Date;
    ngayhethieuluc?: Date;
    ngayracv?: Date;
    ngaycvden?: Date;
    ngayvaoso?: Date;
    ngaybanhanh?: Date;
    nguoiky?: string;
    xuly?: string;
    hanxuli?: string;
    coquanbanhanh?: string;
    noinhan?: string;
    sohieugoc?: string;
    mabp?: string;
    manv?: string;
    masocv?: string;
    maloai?: number;
    matt?: number;
    mavbdi?: number;
    tenvbdi?: string;
    ngayravbdi?: Date;
    ngayvbdi?: Date;
    nhanxuly?: string;
    ghichu?: string;
    ttxuly?: string;
    malv?: number;
    madv?: number;
}

export interface ITraCuu {
    data: TraCuuData;
    ttbosung: TTCVden; // thong tin bo sung cho den va di la nhu nhau nen dung chung interface
    loaicv: ILoaiCV;
    donvi: IDonVi;
    linhvuc: ILinhVuc;
    duthao?: { tennv: string };
    phanloai: string;
}
