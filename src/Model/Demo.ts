import { IDonVi } from "../API/DonVi";
import { ILinhVuc } from "../API/LinhVuc";
import { ILoaiCV } from "../API/LoaiCV";

export interface Demo {
    data: BaseDemo;
    linhvuc: ILinhVuc;
    donvi: IDonVi;
    loaicv: ILoaiCV;
}

export interface BaseDemo {
    id: number;
    malv: number;
    trichyeu: string;
    coquanbanhanh: string;
    maloai: number;
    madv: number;
}
