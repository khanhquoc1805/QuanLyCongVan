import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { Login } from "../../Components/Login/LoginPage";

export interface AuthState {
    isLoggedIn: boolean;
    logging: boolean;
    manv: string;
    quyen: string;
    access_token: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    manv: "",
    quyen: "",
    access_token: "",
};

export interface UserPayload {
    status?: string;
    manv: string;
    quyen: string;
    access_token: string;
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login(state, action: PayloadAction<Login>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<UserPayload>) {
            state.isLoggedIn = true;
            state.logging = false;
            state.manv = action.payload.manv;
            state.quyen = action.payload.quyen;
            state.access_token = action.payload.access_token;
        },
        loginfailed(state, action: PayloadAction<string>) {
            state.logging = false;
        },

        logout(state) {
            state.isLoggedIn = false;
            state.manv = "";
            state.quyen = "";
            state.access_token = "";
        },
    },
});

export const authActions = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectLogging = (state: RootState) => state.auth.logging;
export const selectManv = (state: RootState) => state.auth.manv;
export const selectQuyen = (state: RootState) => state.auth.quyen;
export const selectAccessToken = (state: RootState) => state.auth.access_token;

const authReducer = authSlice.reducer;
export default authReducer;
