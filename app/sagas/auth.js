import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  loginPending,
  loginSuccess,
  loginFail,
  logoutPending,
  logoutSuccess,
  logoutFail,
  registerPending,
  registerFail,
  registerSuccess,
  userDataPending,
  userDataSuccess,
  userDataFail,
  refreshTokenPending,
  refreshTokenFail,
  refreshTokenSuccess,
} from "../store/authSlice";
import { handleLoginSuccess, handleLogoutSuccess } from "../../services/AuthService";
import {
  handleUnauthenticatedResponse,
  sendLoginRequest,
  sendLogoutRequest,
  sendRegisterRequest,
} from "../api/auth";
import Router from "next/router";
import { getPersonalData } from "../api/user";
import { toast } from "react-toastify";

function* handleLoginPending(action) {
  let { email, password, shouldRemember } = action.payload;
  try {
    const res = yield call(sendLoginRequest, { email, password });
    const token = res.data.token;

    yield call(handleLoginSuccess, ...[token, email, password, shouldRemember]);
    yield put(loginSuccess());
    yield put(userDataPending());
  } catch (error) {
    yield call(handleLogoutSuccess);
    const errorMessage = "Can't reach server right now.";
    yield put(loginFail(error?.response?.data || { message: errorMessage }));
  }
}

function* handleLogoutPending() {
  try {
    const res = yield call(sendLogoutRequest);
    yield put(logoutSuccess());
  } catch (error) {
    const errorMsg = "Can't reach server right now.";

    yield put(logoutFail(error?.response?.data || errorMsg));
  } finally {
    yield call(handleLogoutSuccess);
    yield call(Router.push, "/login");
    toast.success("Signed out successfully!");
  }
}

function* handleRegisterPending(action) {
  let { name, lastname, email, password, password_confirmation } = action.payload;
  try {
    const res = yield call(sendRegisterRequest, {
      name,
      lastname,
      email,
      password,
      password_confirmation,
    });

    yield call(handleLoginSuccess, ...[res.data.token, email, password]);
    yield put(registerSuccess(res));
    yield put(userDataPending());
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(registerFail(error?.response?.data || { message: errorMessage }));
  }
}

function* handleUserDataPending() {
  try {
    const res = yield call(getPersonalData);
    yield put(userDataSuccess(res.data));
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(userDataFail(error?.response?.data || { message: errorMessage }));
  }
}

function* handleRefreshTokenPending() {
  try {
    const res = yield call(handleUnauthenticatedResponse);

    yield put(refreshTokenSuccess());
  } catch (error) {
    const errorMessage = error?.message || "Can't reach server right now.";
    yield put(refreshTokenFail(error?.response?.data || { message: errorMessage }));
  }
}

export function* watchLoginPending() {
  yield takeLatest(loginPending.type, handleLoginPending);
}
export function* watchLogoutPending() {
  yield takeEvery(logoutPending.type, handleLogoutPending);
}
export function* watchRegisterPending() {
  yield takeEvery(registerPending.type, handleRegisterPending);
}
export function* watchUserDataPending() {
  yield takeEvery(userDataPending.type, handleUserDataPending);
}
export function* watchRefreshTokenPending() {
  yield takeLatest(refreshTokenPending.type, handleRefreshTokenPending);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginPending),
    fork(watchUserDataPending),
    fork(watchRegisterPending),
    fork(watchLogoutPending),
    fork(watchRefreshTokenPending),
  ]);
}
