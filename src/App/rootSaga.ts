import { all } from "@redux-saga/core/effects";
import CVDenSaga from "../features/CVDen/CVDenSaga";
import SoCVSaga from "../features/SoCV/soCVSaga"

export default function* rootSaga() {
  yield all([CVDenSaga(),SoCVSaga()]);
}
