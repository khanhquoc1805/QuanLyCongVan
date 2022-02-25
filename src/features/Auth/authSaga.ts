import { Login } from './../../Components/Login/LoginPage';

import {
    call,
    delay,
    fork, take
} from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import authApi from "../../API/auth";
import { authActions, UserPayload } from "./authSlice";
import { put } from 'redux-saga/effects';


function* handleLogin(payload: Login) {
    try {
        // yield delay(1000);
        const data: UserPayload = yield call(authApi.login, payload);
        if (data.status === "success") {
            localStorage.setItem("access_token", data.access_token);
            const payload: UserPayload = {
                status: data.status,
                manv : data.manv,
                quyen : data.quyen,
                access_token: data.access_token,
            };
            

            yield put(authActions.loginSuccess(payload));
            //yield delay(1500);
            //window.location.reload();
        } else {
            yield put(authActions.loginfailed(data.status ?? ""));
        }
    } catch (error) {
        yield put(authActions.loginfailed("Fail"));
    }
}

function* handleLogOut() {
    localStorage.removeItem("access_token");
    yield put(authActions.logout);   
}



function* watchLoginFlow() {
    while (true) {
        // yield delay(3000); // waiting for localStorage set
        const isLoggedIn = Boolean(localStorage.getItem("access_token"));
        if (!isLoggedIn) {
            const action: PayloadAction<Login> = yield take(
                authActions.login.type
            );
            console.log(action);
            yield fork(handleLogin, action.payload);
            continue;
        }

        yield take(authActions.logout.type);
        yield call(handleLogOut);
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow);
}


