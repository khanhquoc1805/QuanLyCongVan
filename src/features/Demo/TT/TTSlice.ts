import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../App/store";
import {
    ListParams,
    ListResponse,
    PaginationParams,
} from "../../../Model/Commom";
import { Demo } from "../../../Model/Demo";

export interface DemoState {
    loading: boolean;
    data: [Demo];
    pagination: PaginationParams;
    filter: ListParams;
    time: number;
}

const initiDemoState: Demo = {
    data: {
        id: 0,
        malv: 0,
        trichyeu: "",
        coquanbanhanh: "",
        maloai: 0,
        madv: 0,
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
};

const initialState: DemoState = {
    loading: false,
    data: [initiDemoState],
    pagination: {
        page: 1,
        limit: 5,
        totalRows: 5,
    },
    filter: {
        page: 1,
        limit: 5,
        textSearch: "",
        madv: 2,
    },
    time: 0,
};

const demoSlice = createSlice({
    name: "demo",
    initialState: initialState,
    reducers: {
        fetchData(state, action: PayloadAction<ListParams>) {
            state.loading = true;
        },
        fetchDataSuccess(state, action: PayloadAction<ListResponse<Demo>>) {
            state.data = action.payload.data as [Demo];
            state.pagination = action.payload.pagination;
            state.loading = false;
            state.time = action.payload.time || 0;
        
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
        setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    },
});

export const demoActions = demoSlice.actions;
export const selectDemo = (state: RootState) => state.demo.data;
export const selectPaginationDemo = (state: RootState) => state.demo.pagination;
export const selectFilterDemo = (state: RootState) => state.demo.filter;
export const selectLoadingDemo = (state: RootState) => state.demo.loading;
export const selectTimeDemo = (state : RootState) => state.demo.time;

const demoReducer = demoSlice.reducer;
export default demoReducer;
