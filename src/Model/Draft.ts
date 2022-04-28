export interface BaseDraftCVDi {
    dinhkem: string;
    dokhan: string;
    domat: string;
    iddraft: string;
    madv: string;
    maloai: string;
    malv: string;
    manv: string;
    ngayravbdi: string;
    trichyeu: string;
}

export interface DraftCVDi {
    data : BaseDraftCVDi;
    loaicv? : string;
    donvi: string;
    lv : string;

}
