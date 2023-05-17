import { getCheckoutData, getCheckoutGuestData } from "app/api/checkout";
import Router from "next/router";
import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  getCheckoutPending,
  getCheckoutSuccess,
  getCheckoutFail,
  getCountriesSuccess,
  getCountriesFail, getCountriesPending
} from "../store/checkoutSlice";
import {getAllCountries} from "../api/general";
import some from 'lodash/some';


function* getCheckoutDataFromServer() {
  try {
    const isUserLoggedIn = yield select((state) =>  state?.auth?.isUserLoggedIn);
    let res;
    if(isUserLoggedIn) {
      res = yield call(getCheckoutData);
    } else {
      const cartGuestItems = yield select((state) => state.cart?.cartItems);
      const has_bike = some(cartGuestItems, ['type', 'bike'])
      res = yield call(getCheckoutGuestData, {has_bike});
    }


    yield put(getCheckoutSuccess({ data: res.data }));
  } catch (error) {
    yield put(
      getCheckoutFail({
        error: error.response.data,
      })
    );
    Router.push("/configurator");
  }
}

export function* handleGetCheckout() {
  yield takeEvery(getCheckoutPending.type, getCheckoutDataFromServer);
}

function* handleGetCountriesPending() {
  try {
    const res = yield call(getAllCountries);
    if (res) {
      yield put(getCountriesSuccess(res));
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(getCountriesFail(error?.response?.data || { message: errorMessage }));
  }
}

export function* handleGetCountries() {
  yield takeEvery(getCountriesPending.type, handleGetCountriesPending);
}

export default function* rootSaga() {
  yield all([fork(handleGetCheckout), fork(handleGetCountries)]);
}
