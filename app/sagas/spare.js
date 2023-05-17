import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  searchPending,
  searchSuccess,
  searchFail,
  resultPending,
  resultSuccess,
  resultFail,
} from "../store/spareSlice";
import AppHttp from "../api/AppHttp";

const searchRequest = async (data) => {
  let searchHttp = AppHttp();
  return await searchHttp.get(`/api/spares/searching?keyword=${data.search}`, {
    ...data,
  });
};

function* getsearchDataFromServer(action) {
  let { search } = action.payload;

  try {
    const res = yield call(searchRequest, { search });

    if (res.data) {
      yield put(searchSuccess(res.data));
    }
  } catch (error) {
    let errorMsg = null;
    let statusData = null;
    let errorData = null;
    let response = error.response;

    if (response && response.data) {
      let data = response.data;
      if (data && data.status) {
        errorMsg = data.status;
        errorData = data.data;
        statusData = data.status;
      }
    }

    yield put(
      searchFail({
        error: errorMsg,
        data: errorData,
        status: statusData,
      })
    );
  }
}

export function* handlesearch() {
  yield takeEvery(searchPending.type, getsearchDataFromServer);
}
//

const resultRequest = async ({ q, page }) => {
  let resultHttp = AppHttp();
  return await resultHttp.get(`/api/spares/search`, { params: { q, page } });
};

function* getresultDataFromServer(action) {
  let { q, page } = action.payload;

  try {
    const res = yield call(resultRequest, { q, page });

    if (res.data) {
      yield put(resultSuccess(res.data));
    }
  } catch (error) {
    let errorMsg = null;
    let statusData = null;
    let errorData = null;
    let response = error.response;

    if (response && response.data) {
      let data = response.data;
      if (data && data.status) {
        errorMsg = data.status;
        errorData = data.data;
        statusData = data.status;
      }
    }

    yield put(
      resultFail({
        error: errorMsg,
        data: errorData,
        status: statusData,
      })
    );
  }
}

export function* handleresult() {
  yield takeEvery(resultPending.type, getresultDataFromServer);
}
//

export default function* rootSaga() {
  yield all([fork(handlesearch), fork(handleresult)]);
}
