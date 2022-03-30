import { IDonVi } from "../API/DonVi";

export interface BaseNV {
    manv: string;
    tennv: string;
    ngaysinh: string;
    diachi: string;
    sdt: string;
    chucvu: string;
    password: string;
    quyen: string;
    mabp: string;
    madv: number;
}

interface BPhan {
    mabp: string;
    tenbp: string;
}

export interface IUser {
    nv: BaseNV;
    bophan: BPhan;
    donvi: IDonVi;
}
