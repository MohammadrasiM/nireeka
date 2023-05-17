import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  checkoutError: "",
  checkoutData: null,
  countries: null,
  isGetCountriesLoading: false,
  getCountriesError: false,
  isGetCheckoutLoading: false,
  selectedBillingAddress: null,
  selectedShippingAddress: null,
  selectedBillingCountry: null,
};
const checkout = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    getCheckoutPending(state) {
      state.isGetCheckoutLoading = true;
    },
    getCheckoutSuccess(state, action) {
      state.isGetCheckoutLoading = false;
      state.checkoutData = action.payload.data;
      state.checkoutError = null;
    },
    getCheckoutFail(state, action) {
      state.isGetCheckoutLoading = false;
      state.checkoutData = null;
      state.checkoutError = action.payload.error;
    },
    getCountriesPending(state) {
      state.isGetCountriesLoading = true;
    },
    getCountriesSuccess(state, action) {
      state.isGetCountriesLoading = false;
      state.getCountriesError = false;
      state.countries = action?.payload?.data;
    },
    getCountriesFail(state, action) {
      state.isGetCountriesLoading = false;
      state.getCountriesError = action?.payload?.error;
      state.countries = null;
    },
    setSelectedBillingAddress(state, action) {
      state.selectedBillingAddress = action.payload;
    },
    setSelectedShippingAddress(state, action) {
      state.selectedShippingAddress = action.payload;
    },
    setBillingCountry(state, action) {
      state.selectedBillingCountry = action.payload;
    },
  },
});

export const {
  getCheckoutSuccess,
  getCheckoutPending,
  getCheckoutFail,
  getCountriesFail,
  getCountriesPending,
  getCountriesSuccess,
  setSelectedBillingAddress,
  setSelectedShippingAddress,
  setBillingCountry,
} = checkout.actions;

export default checkout.reducer;
