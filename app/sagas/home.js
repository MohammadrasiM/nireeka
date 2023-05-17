import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {getStatisticsPending, getStatisticsSuccess, getStatisticsFail} from "../store/homePageSlice";
import {getStatisticsData} from "../api/home";

function* handleGetStatisticsPending() {
  try {
    const res = yield call(getStatisticsData);
    if (res) {
      yield put(getStatisticsSuccess(res));
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(getStatisticsFail(error?.response?.data || { message: errorMessage }));
  }
}

export function* handleGetStatistics() {
  yield takeEvery(getStatisticsPending.type, handleGetStatisticsPending);
}

export default function* rootSaga() {
  yield all([fork(handleGetStatistics)]);
}
