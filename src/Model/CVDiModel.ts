import { IDonVi } from "../API/DonVi";
import { ILinhVuc } from "../API/LinhVuc";
import { ILoaiCV } from "../API/LoaiCV";
import { TTCVden } from "./CVDenModel";

export interface ICVDi {
    cvdi: BaseCVDi;
    ttbosung: TTCVden; // thong tin bo sung cho den va di la nhu nhau nen dung chung interface
    donvi: IDonVi;
    loaicv : ILoaiCV;
    linhvuc: ILinhVuc;
}


export interface BaseCVDi {
    mavbdi: number;
    tenvbdi: string;
    ngayravbdi: Date;
    ngayvbdi?: Date | undefined;
    ngayvaoso?: Date;
    nhanxuly?: string;
    ghichu?: string;
    ttxuly: string;
    mabp?: string;
    manv?: string;
    masocv?: string;
    maloai?: number;
    matt?: number;
    matc?: number;
    malv?: number;
    madv?: number;
}
