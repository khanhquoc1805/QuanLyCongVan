import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { ListParams, ListResponse, PaginationParams } from "../../Model/Commom";
import { ICVDi } from "../../Model/CVDiModel";

export interface CVDiState {
    dscvdi: [ICVDi];
    pagination: PaginationParams;
    filter: ListParams;
}

const initCVDiState: ICVDi = {
    cvdi: {
        mavbdi: 0,
        tenvbdi: "",
        ngayravbdi: new Date(),
        ngayvbdi: new Date(),
        ngayvaoso: new Date(),
        nhanxuly: "",
        ghichu: "",
        ttxuly: "",
        mabp: "",
        manv: "",
        masocv: "",
        maloai: 0,
        matt: 0,
        matc: 0,
        malv: 0,
        madv: 0,
    },
    ttbosung: {
        matt: 0,
        sotrang: 0,
        dokhan: "string",
        dinhkem: "",
        domat: " string",
        khac: "string",
    },
};

const initialState: CVDiState = {
    dscvdi: [initCVDiState],
    pagination: {
        page: 1,
        limit: 6,
        totalRows: 10,
    },
    filter: {
        page: 1,
        limit: 5,
    },
};

const cvDiSlice = createSlice({
    name: "cvdi",
    initialState: initialState,
    reducers: {
        fetchData(state, action: PayloadAction<ListParams>) {},
        fetchDataSuccess(state, action: PayloadAction<ListResponse<ICVDi>>) {
            state.dscvdi = action.payload.data as [ICVDi];
            state.pagination = action.payload.pagination;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
    },
});

export const cvDiActions = cvDiSlice.actions;
export const selectDsCVDi = (state: RootState) => state.cvdi.dscvdi;
export const selectPagination = (state: RootState) => state.cvdi.pagination;
export const selectFilter = (state: RootState) => state.cvdi.filter;

const cvDiReducer = cvDiSlice.reducer;
export default cvDiReducer;
