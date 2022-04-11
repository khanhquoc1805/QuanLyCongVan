import { PayloadAction } from "@reduxjs/toolkit";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import traCuuApi from "../../API/TraCuuApi";
import { ListParams, ListResponse } from "../../Model/Commom";
import { ITraCuu } from "../../Model/TraCuuModel";
import { traCuuActions } from "./TraCuuSlice";

function* fetchDataTraCuu(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<ITraCuu> = yield call(
            traCuuApi.getDataTraCuu,
            action.payload
        );

        // console.log(response);
        yield put(traCuuActions.fetchDataSuccess(response));
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: "" });
    }
}

// function* handleSearchChange(action: PayloadAction<ListParams>) {
//     yield put(traCuuActions.setFilter(action.payload));
// }

export default function* TraCuuSaga() {
    yield takeLatest(traCuuActions.fetchData, fetchDataTraCuu);
    // yield debounce(
    //     300,
    //     cvDiActions.setFilterWithDebounce.type,
    //     handleSearchChange
    // );
}
