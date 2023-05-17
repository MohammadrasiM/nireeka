import { createSlice } from "@reduxjs/toolkit";
import CookiesService from "../../services/CookiesService";

const initialState = {
  isAuthLoading: false,
  isUserLoggedIn: CookiesService.get("access_token") ? true : false,
  authenticationError: null,
  userData: null,
  isUserDataLoading: false,
  wasRegisterRequestSuccessful: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginPending(state) {
      state.isAuthLoading = true;
      state.isUserLoggedIn = false;
      state.authenticationError = null;
    },
    loginSuccess(state) {
      state.isAuthLoading = false;
      state.isUserLoggedIn = true;
      state.authenticationError = null;
    },
    loginFail(state, action) {
      state.isAuthLoading = false;
      state.isUserLoggedIn = false;
      state.authenticationError = action.payload;
    },
    logoutPending(state) {
      state.isAuthLoading = true;
      state.authenticationError = null;
    },
    logoutSuccess(state) {
      state.isAuthLoading = false;
      state.isUserLoggedIn = false;
      state.userData = null;
      state.authenticationError = null;
    },
    logoutFail(state, action) {
      state.isAuthLoading = false;
      state.isUserLoggedIn = false;
      state.userData = null;
      state.authenticationError = action.payload;
    },
    registerPending(state) {
      state.isAuthLoading = true;
      state.isUserLoggedIn = false;
      state.authenticationError = null;
      state.wasRegisterRequestSuccessful = false;
    },
    registerSuccess(state) {
      state.isAuthLoading = false;
      state.isUserLoggedIn = true;
      state.authenticationError = null;
      state.wasRegisterRequestSuccessful = true;
    },
    registerFail(state, action) {
      state.isAuthLoading = false;
      state.isUserLoggedIn = false;
      state.authenticationError = action.payload;
      state.wasRegisterRequestSuccessful = false;
    },
    setRegisterRequestSuccessful(state, action) {
      state.wasRegisterRequestSuccessful = action.payload;
    },
    userDataPending(state) {
      state.isUserDataLoading = true;
    },
    userDataSuccess(state, action) {
      state.isUserDataLoading = false;
      state.userData = { ...action.payload, unit: action.payload.unit ? action.payload.unit : 0 };
      state.authenticationError = null;
    },
    userDataFail(state, action) {
      state.isUserDataLoading = false;
      state.authenticationError = action.payload;
      state.userData = null;
    },
    refreshTokenPending(state) {
      state.authenticationError = null;
      state.isAuthLoading = true;
    },
    refreshTokenSuccess(state) {
      state.authenticationError = null;
      state.isAuthLoading = false;
      state.isUserLoggedIn = true;
    },
    refreshTokenFail(state, action) {
      state.authenticationError = action.payload;
      state.isAuthLoading = false;
      state.isUserLoggedIn = false;
      state.userData = null;
    },
    resetAuthSideEffects(state) {
      state.authenticationError = null;
      state.wasRegisterRequestSuccessful = false;
    },
  },
});

export const {
  loginPending,
  loginSuccess,
  loginFail,
  logoutPending,
  logoutSuccess,
  logoutFail,
  userDataPending,
  userDataSuccess,
  userDataFail,
  registerPending,
  registerSuccess,
  registerFail,
  setRegisterRequestSuccessful,
  refreshTokenPending,
  refreshTokenSuccess,
  refreshTokenFail,
  resetAuthSideEffects,
} = authSlice.actions;

export default authSlice.reducer;
