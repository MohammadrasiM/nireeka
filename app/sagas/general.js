import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {getBikesPending, getBikesSuccess, getBikesFail, deleteFileSuccess, deleteFilePending, deleteFileFail} from "../store/generalSlice";
import {getAllBikes, deleteFile} from "../api/general";

function* handleGetBikesPending() {
  try {
    const res = yield call(getAllBikes);
    if (res) {
      yield put(getBikesSuccess(res));
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(getBikesFail(error?.response?.data || { message: errorMessage }));
  }
}

export function* handleGetBikes() {
  yield takeEvery(getBikesPending.type, handleGetBikesPending);
}

function* handleDeleteFilePending(action) {
  try {
    const res = yield call(deleteFile, action?.payload?.id);
    if (res?.success) {
      yield put(deleteFileSuccess(res));
      if(action?.payload.onSuccess) action?.payload.onSuccess(res?.data)
      return;
    }
    yield put(deleteFileFail());
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(deleteFileFail(error?.response?.data || { message: errorMessage }));
  }
}

export function* handleDeleteFile() {
  yield takeEvery(deleteFilePending.type, handleDeleteFilePending);
}

export default function* rootSaga() {
  yield all([fork(handleGetBikes), fork(handleDeleteFile)]);
}
