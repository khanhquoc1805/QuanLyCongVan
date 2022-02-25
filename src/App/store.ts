import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import cvDenReducer from "../features/CVDen/CVDenSlice";
import soCVReducer from "../features/SoCV/SoCVSlice"
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";

const reducer = combineReducers({
  cvden: cvDenReducer,
  socv : soCVReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
