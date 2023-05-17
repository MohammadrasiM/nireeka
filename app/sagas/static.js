import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {getPrivacyPolicyFail, getPrivacyPolicyPending, getPrivacyPolicySuccess, getTermsFail, getTermsPending, getTermsSuccess, getRRPolicyFail, getRRPolicySuccess, getRRPolicyPending} from "../store/staticSlice";
import {getTerms, getRRPolicy, getPrivacyPolicy} from "../api/statics";

function* handleGetTermsPending() {
  try {
    const res = yield call(getTerms);
    if (res) {
      yield put(getTermsSuccess(res));
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(getTermsFail(error?.response?.data || { message: errorMessage }));
  }
}

export function* handleGetTerms() {
  yield takeEvery(getTermsPending.type, handleGetTermsPending);
}

function* handleGetRRPolicyPending() {
  try {
    const res = yield call(getRRPolicy);
    if (res) {
      yield put(getRRPolicySuccess(res));
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(getRRPolicyFail(error?.response?.data || { message: errorMessage }));
  }
}

export function* handleGetRRPolicy() {
  yield takeEvery(getRRPolicyPending.type, handleGetRRPolicyPending);
}


function* handleGetPrivacyPolicyPending() {
  try {
    const res = yield call(getPrivacyPolicy);
    if (res) {
      yield put(getPrivacyPolicySuccess(res));
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(getPrivacyPolicyFail(error?.response?.data || { message: errorMessage }));
  }
}

export function* handleGetPrivacyPolicy() {
  yield takeEvery(getPrivacyPolicyPending().type, handleGetPrivacyPolicyPending);
}

export default function* rootSaga() {
  yield all([fork(handleGetTerms), fork(handleGetRRPolicy), fork(handleGetPrivacyPolicy)]);
}
