import { ISoCV } from "../../Model/SoCV";
import { ListResponse, PaginationParams, ListParams } from "../../Model/Commom";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";

export interface SoCVState {
    dssocv: [ISoCV]
    pagination: PaginationParams
}

const initSoCVState: ISoCV = {
    masocv: "",
    tensocv: "",
    nhomsocv: "",
    donvi: "",
}

const initialState: SoCVState = {
    dssocv: [initSoCVState],
    pagination: {
        page: 1,
        limit: 6,
        totalRows: 23,
    }
}

const soCVSlice = createSlice({
    name: "socv",
    initialState: initialState,
    reducers: {
        fetchData(state, action: PayloadAction<ListParams>) {
        },
        fetchDataSuccess(state, action: PayloadAction<ListResponse<ISoCV>>) {
            state.dssocv = action.payload.data as [ISoCV];
            state.pagination = action.payload.pagination;
        },
    }
})

export const soCVActions = soCVSlice.actions;
export const selectDsSoCV = (state: RootState) => state.socv.dssocv;
const soCVReducer = soCVSlice.reducer;
export default soCVReducer;