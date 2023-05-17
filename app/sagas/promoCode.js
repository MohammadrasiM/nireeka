import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  promoCodePending,
  promoCodeSuccess,
  promoCodeFail,
  getpromoCodeSuccess,
  getpromoCodePending,
  getpromoCodeFail,
  //   updatepromoCodeSuccess,
  //   updatepromoCodePending,
  //   updatepromoCodeFail,
  //   delItempromoCodeSuccess,
  //   delItempromoCodePending,
  //   delItempromoCodeFail,
} from "../store/prompCodeSlice";
import AppHttp from "../api/AppHttp";

const promoCodeRequest = async (data) => {
  let promoCodeHttp = AppHttp();
  
  return await promoCodeHttp.post("/api/check-promo-code", { ...data });
};

function* postpromoCodeDataFromServer(action) {
    let items = action.payload;
    // 
    
    try {
      // 
      const res = yield call(promoCodeRequest, { items });
      
      if (res.data) {
        // 
      yield put(promoCodeSuccess(res.data));
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
      promoCodeFail({
        error: errorMsg,
        data: errorData,
        status: statusData,
      })
    );
  }
}

export function* handlepromoCode() {
  yield takeEvery(promoCodePending.type, postpromoCodeDataFromServer);
}
/////////////////////////////////
/////////////////////////////////
const getpromoCodeRequest = async (data) => {
  let getpromoCodetHttp = AppHttp();
  return await getpromoCodetHttp.get("/api/promoCode", {
    ...data,
  });
};

function* getpromoCodeDataFromServer(action) {
  //   let { topic_id, comment, help_full } = action.payload;

  try {
    const res = yield call(getpromoCodeRequest, {
      action,
    });

    if (res.data) {
      yield put(getpromoCodeSuccess(res.data));
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
      getpromoCodeFail({
        error: errorMsg,
        data: errorData,
        status: statusData,
      })
    );
  }
}

export function* handleGetpromoCode() {
  yield takeEvery(getpromoCodePending.type, getpromoCodeDataFromServer);
}
////////////////////////////////////////////////////////////////

export default function* rootSaga() {
  yield all([
    fork(handlepromoCode),
    fork(handleGetpromoCode),
    // fork(handleresult),
  ]);
}
