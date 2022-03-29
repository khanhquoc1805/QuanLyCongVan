import { getDonViFromToken } from "./../../Utils/getValueFormToken";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { ListResponse, PaginationParams, ListParams } from "../../Model/Commom";
import { ICVDen } from "../../Model/CVDenModel";

export interface CVDenState {
    dscvden: [ICVDen];
    pagination: PaginationParams;
    filter: ListParams;
}

const initCVDenState: ICVDen = {
    cvden: {
        macvden: 0,
        tencvden: "string",
        ngayracv: new Date(),
        ngaycvden: new Date(),
        ngayvaoso: new Date(),
        nguoiky: "string",
        xuly: "string",
        hanxuly: "string",
        coquanbanhanh: "string",
        noinhan: "string",
        sohieugoc: "string",
        mabp: "string",
        manv: "string",
        masocv: "string",
        maloai: "string",
        matt: 0,
        matc: "string",
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
    donvi: {
        madv: 0,
        tendv: "",
    },
    loaicv: {
        maloai: 0,
        tenloai: "",
    },
    linhvuc: {
        malv: 0,
        tenlv: "",
    },
};

const initialState: CVDenState = {
    dscvden: [initCVDenState],
    pagination: {
        page: 1,
        limit: 2,
        totalRows: 23,
    },
    filter: {
        page: 1,
        limit: 2,
        status: "chuaxuly",
        textSearch: "",
        madv: getDonViFromToken(),
    },
};

const cvDenSlice = createSlice({
    name: "cvden",
    initialState: initialState,
    reducers: {
        fetchData(state, action: PayloadAction<ListParams>) {},
        fetchDataSuccess(state, action: PayloadAction<ListResponse<ICVDen>>) {
            state.dscvden = action.payload.data as [ICVDen];
            state.pagination = action.payload.pagination;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
    },
});

export const cvDenActions = cvDenSlice.actions;
export const selectDsCVden = (state: RootState) => state.cvden.dscvden;
export const selectPagination = (state: RootState) => state.cvden.pagination;
export const selectFilter = (state: RootState) => state.cvden.filter;
const cvDenReducer = cvDenSlice.reducer;
export default cvDenReducer;
