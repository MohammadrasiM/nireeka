import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  terms: null,
  getTermsIsLoading: false,
  getTermsError: false,
  rrPolicy: null,
  getRRPolicyIsLoading: false,
  getRRPolicyError: false,
  privacyPolicy: null,
  getPrivacyPolicyIsLoading: false,
  getPrivacyPolicyError: false,
};
const statics = createSlice({
  name: "static",
  initialState,
  reducers: {
    getTermsPending(state) {
      state.getTermsIsLoading = true;
    },
    getTermsSuccess(state, action) {
      state.getTermsIsLoading = false;
      state.getTermsError = false;
      state.terms = action?.payload?.data;
    },
    getTermsFail(state, action) {
      state.getTermsIsLoading = false;
      state.getTermsError = action?.payload?.error;
      state.terms = null;
    },
    getRRPolicyPending(state) {
      state.getRRPolicyIsLoading = true;
    },
    getRRPolicySuccess(state, action) {
      state.getRRPolicyIsLoading = false;
      state.getRRPolicyError = false;
      state.rrPolicy = action?.payload?.data;
    },
    getRRPolicyFail(state, action) {
      state.getRRPolicyIsLoading = false;
      state.getRRPolicyError = action?.payload?.error;
      state.rrPolicy = null;
    },
    getPrivacyPolicyPending(state) {
      state.getPrivacyPolicyIsLoading = true;
    },
    getPrivacyPolicySuccess(state, action) {
      state.getPrivacyPolicyIsLoading = false;
      state.getPrivacyPolicyError = false;
      state.privacyPolicy = action?.payload?.data;
    },
    getPrivacyPolicyFail(state, action) {
      state.getPrivacyPolicyIsLoading = false;
      state.getPrivacyPolicyError = action?.payload?.error;
      state.privacyPolicy = null;
    },
  },
});

export const {
  getTermsFail,
  getTermsSuccess,
  getTermsPending,
  getPrivacyPolicyFail,
  getPrivacyPolicyPending,
  getPrivacyPolicySuccess,
  getRRPolicyFail,
  getRRPolicyPending,
  getRRPolicySuccess
} = statics.actions;

export default statics.reducer;
