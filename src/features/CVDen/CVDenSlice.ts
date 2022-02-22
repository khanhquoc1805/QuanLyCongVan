import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { ListResponse, PaginationParams,ListParams } from "../../Model/Commom";
import { ICVDen } from "../../Model/CVDenModel"


export interface CVDenState {
  dscvden: [ICVDen];
  pagination: PaginationParams;
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
  },
  ttbosung: {
    matt: 0,
    sotrang: 0,
    dokhan: "string",
    domat: " string",
    khac: "string",
  }
}

const initialState: CVDenState = {
  dscvden: [initCVDenState],
  pagination: {
    page: 1,
    limit: 6,
    totalRows: 23,
  },
}

const cvDenSlice = createSlice({
  name: "cvden",
  initialState: initialState,
  reducers: {
    fetchData(state,action: PayloadAction<ListParams>) {
    },
    fetchDataSuccess(state, action: PayloadAction<ListResponse<ICVDen>>) {
      state.dscvden = action.payload.data as [ICVDen];
      state.pagination = action.payload.pagination;
    },
  },
});

export const cvDenActions = cvDenSlice.actions;
export const selectDsCVden = (state: RootState) => state.cvden.dscvden;
const cvDenReducer = cvDenSlice.reducer;
export default cvDenReducer;
