import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { ListParams, ListResponse, PaginationParams } from "../../Model/Commom";
import { ITraCuu } from "../../Model/TraCuuModel";
import { getDonViFromToken } from "../../Utils/getValueFormToken";

export interface TraCuuState {
    data: [ITraCuu];
    pagination: PaginationParams;
    filter: ListParams;
}
const initCVDiState: ITraCuu = {
    data: {
        mavbdi: 0,
        tenvbdi: "",
        ngayravbdi: new Date(),
        ngayvbdi:  new Date(),
        ngayvaoso: new Date(),
        nhanxuly: "",
        ghichu: "",
        ttxuly: "",
        mabp: "",
        manv: "",
        masocv: "",
        maloai: 0,
        matt: 0,
        malv: 0,
        madv: 0,

        macvden: 0,
        tencvden: "string",
        ngayracv: new Date(),
        ngaycvden:  new Date(),
        nguoiky: "string",
        xuly: "string",
        coquanbanhanh: "string",
        noinhan: "string",
        sohieugoc: "string",
        soden: 0,
        ngaycohieuluc: new Date(),
        ngayhethieuluc: new Date(),
        ngaybanhanh: new Date(),
    },
    ttbosung: {
        matt: 0,
        sotrang: 0,
        dokhan: "string",
        dinhkem: "",
        domat: " string",
        khac: "string",
    },
    loaicv: {
        maloai: 0,
        tenloai: "",
    },
    donvi: {
        madv: 0,
        tendv: "",
    },
    linhvuc: {
        malv: 0,
        tenlv: "",
    },
    duthao: {
        tennv: "",
    },
    phanloai: "cvden",
};

const initialState: TraCuuState = {
    data: [initCVDiState],
    pagination: {
        page: 1,
        limit: 5,
        totalRows: 4,
    },
    filter: {
        page: 1,
        limit: 2,
        textSearch: "",
        loaicv: "cvdi",
        madv: getDonViFromToken(),
    },
};
const traCuuSlice = createSlice({
    name: "tracuu",
    initialState: initialState,
    reducers: {
        fetchData(state, action: PayloadAction<ListParams>) {},
        fetchDataSuccess(state, action: PayloadAction<ListResponse<ITraCuu>>) {
            state.data = action.payload.data as [ITraCuu];
            state.pagination = action.payload.pagination;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
        setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    },
});

export const traCuuActions = traCuuSlice.actions;
export const selectDsTraCuu = (state: RootState) => state.tracuu.data;
export const selectPaginationTraCuu = (state: RootState) =>
    state.tracuu.pagination;
export const selectFilterTraCuu = (state: RootState) => state.tracuu.filter;

const traCuuReducer = traCuuSlice.reducer;
export default traCuuReducer;
