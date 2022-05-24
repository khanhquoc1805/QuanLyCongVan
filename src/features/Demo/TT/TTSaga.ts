import { PayloadAction } from "@reduxjs/toolkit";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import demoApi from "../../../API/Demo";
import { ListParams, ListResponse } from "../../../Model/Commom";
import { Demo } from "../../../Model/Demo";

import { demoActions } from "./TTSlice";

function* fetchDemo(action: PayloadAction<ListParams>) {
    try {
        var date1 = new Date().getTime();
        const response: ListResponse<Demo> = yield call(
            demoApi.getDemo,
            action.payload
        );
        var date2 = new Date().getTime();
        var diff = date2 - date1;
        //console.log(diff);
        console.log(response);
        yield put(demoActions.fetchDataSuccess(response));
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: "" });
    }
}

function* handleSearchChange(action: PayloadAction<ListParams>) {
    yield put(demoActions.setFilter(action.payload));
}

export default function* DemoSaga() {
    yield takeLatest(demoActions.fetchData, fetchDemo);
    yield debounce(
        300,
        demoActions.setFilterWithDebounce.type,
        handleSearchChange
    );
}
