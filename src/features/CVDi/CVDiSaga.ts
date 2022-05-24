import { PayloadAction } from "@reduxjs/toolkit";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import cvDiApi from "../../API/CVdi";
import { ListParams, ListResponse } from "../../Model/Commom";
import { ICVDi } from "../../Model/CVDiModel";
import { cvDiActions } from "./CVDiSlice";

function* fetchCVDi(action: PayloadAction<ListParams>) {
    try {
        var date1 = new Date().getTime();
        const response: ListResponse<ICVDi> = yield call(
            cvDiApi.getCVDi,
            action.payload
        );
        var date2 = new Date().getTime();
        var diff = date2 - date1;
        //console.log(diff);
        console.log(response);
        yield put(cvDiActions.fetchDataSuccess(response));
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: "" });
    }
}

function* handleSearchChange(action: PayloadAction<ListParams>) {
    yield put(cvDiActions.setFilter(action.payload));
}

export default function* CVDiSaga() {
    yield takeLatest(cvDiActions.fetchData, fetchCVDi);
    yield debounce(
        300,
        cvDiActions.setFilterWithDebounce.type,
        handleSearchChange
    );
}
