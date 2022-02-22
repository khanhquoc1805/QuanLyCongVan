export interface ICVDen {
    cvden: BaseCVden;
    ttbosung: TTCVden;
}

export interface BaseCVden {
    macvden: number;
    tencvden: string;
    ngayracv: Date;
    ngaycvden: Date;
    ngayvaoso: Date;
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
    dokhan: string;
    domat: string;
    khac: string;
}
