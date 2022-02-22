import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { ListParams, ListResponse } from "../../Model/Commom";
import { ICVDen } from "../../Model/CVDenModel";
import { cvDenActions } from "./CVDenSlice";
import cvDenApi from "../../API/CVDen"

function* fetchCVDen(action: PayloadAction<ListParams>) {
  try {
    const dscvden: [ICVDen] = yield call(cvDenApi.getCVDen, action.payload);

    const payload: ListResponse<ICVDen> = {
      data: dscvden,
      pagination: {
        limit: action.payload.limit || 3,
        page: action.payload.page || 1,

      },
    };
    yield put(cvDenActions.fetchDataSuccess(payload));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: "" });
  }
}

export default function* CVDenSaga() {
  yield takeLatest(cvDenActions.fetchData, fetchCVDen);
}
