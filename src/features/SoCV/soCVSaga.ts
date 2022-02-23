import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { ListParams, ListResponse } from "../../Model/Commom";
import { ISoCV } from "../../Model/SoCV";

import soCVApi from "../../API/SoCV";

import { soCVActions } from "./SoCVSlice";

function* fetchSoCV(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<ISoCV> = yield call(
            soCVApi.getSoCV,
            action.payload
        );

        yield put(soCVActions.fetchDataSuccess(response));
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: "" });
    }
}

export default function* SoCVSaga() {
    yield takeLatest(soCVActions.fetchData, fetchSoCV);
}
