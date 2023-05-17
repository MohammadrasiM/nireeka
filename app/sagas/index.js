/**
 * Root Sagas
 */
import { all } from "redux-saga/effects";

// sagas
import authSagas from "./auth";
import helpCenterSagas from "./helpCenter";
import SpareSagas from "./spare";
import cartSagas from "./cart";
import checkoutSagas from "./checkout";
import generalSagas from "./general";
import staticsSagas from "./static";
import homeSagas from "./home";
import configuratorSagas from "./configurator";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    cartSagas(),
    checkoutSagas(),
    generalSagas(),
    staticsSagas(),
    homeSagas(),
    helpCenterSagas(),
    SpareSagas(),
    configuratorSagas(),
  ]);
}
