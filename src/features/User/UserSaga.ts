import { call, put, takeLatest } from "redux-saga/effects";
import { userActions } from "./UserSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ListParams, ListResponse } from "../../Model/Commom";
import { IUser } from "../../Model/User";
import userApi from "../../API/User";

function* fetchUser(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<IUser> = yield call(
            userApi.getUser,
            action.payload
        );

        yield put(userActions.fetchUserListSuccess(response));
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: "" });
    }
}

export default function* UserSaga() {
    yield takeLatest(userActions.fetchUserList, fetchUser);
}
