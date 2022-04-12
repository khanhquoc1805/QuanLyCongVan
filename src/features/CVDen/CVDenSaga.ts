import { PayloadAction } from "@reduxjs/toolkit";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { ListParams, ListResponse } from "../../Model/Commom";
import { ICVDen } from "../../Model/CVDenModel";
import { cvDenActions } from "./CVDenSlice";
import cvDenApi from "../../API/CVDen";

function* fetchCVDen(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<ICVDen> = yield call(
            cvDenApi.getCVDen,
            action.payload
        );

        yield put(cvDenActions.fetchDataSuccess(response));
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: "" });
    }
}

function* handleSearchChange(action: PayloadAction<ListParams>) {
    yield put(cvDenActions.setFilter(action.payload));
}

export default function* CVDenSaga() {
    yield takeLatest(cvDenActions.fetchData, fetchCVDen);
    yield debounce(
        300,
        cvDenActions.setFilterWithDebounce.type,
        handleSearchChange
    );
}
