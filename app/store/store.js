/**
 * Redux Store
 */

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../sagas";
import configuratorReducer from "./configuratorSlice";
import authReducer from "./authSlice";
import homePageReducer from "./homePageSlice";
import helpCenterReducer from "./helpCenterSlice";
import SpareSliceReducer from "./spareSlice";
import checkoutReducer from "./checkoutSlice";
import modalReducer from "./modalSlice";
import cartReducer from "./cartSlice";
import cartServerReducer from "./cartServer";
import dashboardReducer from "./dashboardSlice";
import cacheReducer from "./requestCacheState";
// import halloweenReducer from "./promoHalloween";
import comparisonReducer from "./comparisonSlice";
import generalReducer from "./generalSlice";
import staticReducer from "./staticSlice";
import stateCountryReducer from './stateCountrySlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    stateCountry: stateCountryReducer,
    ...homePageReducer,
    // halloween: halloweenReducer,
    auth: authReducer,
    ...helpCenterReducer,
    ...SpareSliceReducer,
    configurator: configuratorReducer,
    cartServer: cartServerReducer,
    checkout: checkoutReducer,
    general: generalReducer,
    static: staticReducer,
    cart: cartReducer,
    modal: modalReducer,
    dashboard: dashboardReducer,
    cache: cacheReducer,
    comparison: comparisonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
