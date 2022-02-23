import { ISoCV } from "../../Model/SoCV";
import { ListResponse, PaginationParams, ListParams } from "../../Model/Commom";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";

export interface SoCVState {
    dssocv: [ISoCV];
    pagination: PaginationParams;
    filter: ListParams;
}

const initSoCVState: ISoCV = {
    masocv: "",
    tensocv: "",
    nhomsocv: "",
    donvi: "",
};

const initialState: SoCVState = {
    dssocv: [initSoCVState],
    pagination: {
        page: 1,
        limit: 6,
        totalRows: 23,
    },
    filter: {
        page: 1,
        limit: 5,
    },
};

const soCVSlice = createSlice({
    name: "socv",
    initialState: initialState,
    reducers: {
        fetchData(state, action: PayloadAction<ListParams>) {},
        fetchDataSuccess(state, action: PayloadAction<ListResponse<ISoCV>>) {
            state.dssocv = action.payload.data as [ISoCV];
            state.pagination = action.payload.pagination;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
    },
});

export const soCVActions = soCVSlice.actions;
export const selectDsSoCV = (state: RootState) => state.socv.dssocv;
export const selectPagination = (state: RootState) => state.socv.pagination;
export const selectSoCVFilter = (state: RootState) => state.socv.filter;
const soCVReducer = soCVSlice.reducer;
export default soCVReducer;
