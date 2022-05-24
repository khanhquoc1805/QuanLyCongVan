import { all } from "@redux-saga/core/effects";
import authSaga from "../features/Auth/authSaga";
import CVDenSaga from "../features/CVDen/CVDenSaga";
import CVDiSaga from "../features/CVDi/CVDiSaga";
import DemoSaga from "../features/Demo/TT/TTSaga";
import SoCVSaga from "../features/SoCV/soCVSaga";
import TraCuuSaga from "../features/TraCuu/TraCuuSaga";
import UserSaga from "../features/User/UserSaga";

export default function* rootSaga() {
    yield all([
        CVDenSaga(),
        SoCVSaga(),
        authSaga(),
        CVDiSaga(),
        UserSaga(),
        TraCuuSaga(),
        DemoSaga(),
    ]);
}
