import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { ListParams, ListResponse, PaginationParams } from "../../Model/Commom";
import { IUser } from "../../Model/User";

export interface UserState {
    loading: boolean;
    dsnv: [IUser];
    pagination: PaginationParams;
    filter: ListParams;
}

const initUser: IUser = {
    nv: {
        manv: "",
        tennv: "",
        ngaysinh: "",
        diachi: "",
        sdt: "",
        chucvu: "",
        matkhau: "",
        quyen: "",
        mabp: "",
        madv: "",
    },
    bophan: {
        mabp: "",
        tenbp: "",
    },
    donvi: {
        madv: 0,
        tendv: "",
    },
};

const initialState: UserState = {
    loading: false,
    dsnv: [initUser],
    pagination: {
        page: 1,
        limit: 10,
        totalRows: 23,
    },
    filter: {
        page: 1,
        limit: 9,
    },
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        fetchUserList(state, action: PayloadAction<ListParams>) {
            state.loading = true;
        },
        fetchUserListSuccess(
            state,
            action: PayloadAction<ListResponse<IUser>>
        ) {
            state.dsnv = action.payload.data as [IUser];
            state.pagination = action.payload.pagination;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
    },
});

export const userActions = userSlice.actions;

export const selectLoadingUser = (state: RootState) => state.user.loading;
export const selectDsUser = (state: RootState) => state.user.dsnv;
export const selectPaginationUser = (state: RootState) => state.user.pagination;
export const selectUserFilter = (state: RootState) => state.user.filter;

const userReducer = userSlice.reducer;
export default userReducer;
