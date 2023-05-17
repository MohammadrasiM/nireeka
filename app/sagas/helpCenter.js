import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  helpFullPending,
  helpFullSuccess,
  helpFullFail,
  helpFullGuestPending,
  helpFullGuestSuccess,
  helpFullGuestFail,
  searchPending,
  searchSuccess,
  searchFail,
  resultPending,
  resultSuccess,
  resultFail,
  getTopicFail,
  getTopicPending,
  getTopicSuccess
} from "../store/helpCenterSlice";
import AppHttp from "../api/AppHttp";
import {getTopic} from "../api/help/getTopic";
const helpFullRequest = async (data) => {
  let helpFullHttp = AppHttp();

  return await helpFullHttp.put("/api/help-center/helpful", { ...data });
};

function* gethelpFullDataFromServer(action) {
  let { topic_id, comment, help_full } = action.payload;

  try {
    const res = yield call(helpFullRequest, { topic_id, comment, help_full });

    if (res.data) {
      yield put(helpFullSuccess(res.data));
    }
  } catch (error) {
    let errorMsg = null;
    let statusData = null;
    let errorData = null;
    let response = error.response;

    if (response && response.data) {
      let data = response.data;
      if (data && data.status) {
        errorMsg = response.data.status;
        errorData = response.data.data;
        statusData = response.data.status;
      }
    }

    yield put(
      helpFullFail({
        error: errorMsg,
        data: errorData,
        status: statusData,
      })
    );
  }
}

export function* handlehelpFull() {
  yield takeEvery(helpFullPending.type, gethelpFullDataFromServer);
}
//
const helpFullGuestRequest = async (data) => {
  let helpFullGuestHttp = AppHttp();
  return await helpFullGuestHttp.put("/api/help-center/helpful-guest", {
    ...data,
  });
};

function* gethelpFullGuestDataFromServer(action) {
  let { topic_id, comment, help_full } = action.payload;

  try {
    const res = yield call(helpFullGuestRequest, {
      topic_id,
      comment,
      help_full,
    });

    if (res.data) {
      yield put(helpFullGuestSuccess(res.data));
    }
  } catch (error) {
    let errorMsg = null;
    let statusData = null;
    let errorData = null;
    let response = error.response;

    if (response && response.data) {
      let data = response.data;
      if (data && data.status) {
        errorMsg = response.data.status;
        errorData = response.data.data;
        statusData = response.data.status;
      }
    }

    yield put(
      helpFullGuestFail({
        error: errorMsg,
        data: errorData,
        status: statusData,
      })
    );
  }
}

export function* handlehelpFullGuest() {
  yield takeEvery(helpFullGuestPending.type, gethelpFullGuestDataFromServer);
}
const searchRequest = async (data) => {
  let searchHttp = AppHttp();
  return await searchHttp.get(
    `/api/help-center/searching?keyword=${data.search}`,
    {
      ...data,
    }
  );
};

function* getsearchDataFromServer(action) {
  let search = action.payload.inputValue.search;

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

const resultRequest = async (data) => {
  let resultHttp = AppHttp();
  return await resultHttp.get(
    `/api/help-center/search?q=${data.result}&page=${data.id}`,
    {
      ...data,
    }
  );
};

function* getresultDataFromServer(action) {
  let { result, id } = action.payload;

  try {
    const res = yield call(resultRequest, { result, id });

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


function* handleGetTopicPending(action) {
  try {
    const res = yield call(getTopic, action.payload);
    if (res) {
      yield put(getTopicSuccess(res));
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(getTopicFail(error?.response?.data || { message: errorMessage }));
  }
}

export function* handleGetTopic() {
  yield takeEvery(getTopicPending.type, handleGetTopicPending);
}

export default function* rootSaga() {
  yield all([
    fork(handlehelpFull),
    fork(handlehelpFullGuest),
    fork(handlesearch),
    fork(handleresult),
    fork(handleGetTopic),
  ]);
}
