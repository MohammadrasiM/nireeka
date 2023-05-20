import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAddToCartLoading: false,
  isGetCartLoading: false,
  error: null,
  cartData: {},
  removeItemSuccess: null,
  updateItemCountSuccess: null,
  countCartData: {},
  countCartDataLoading: false,
  countCartDataError: null,
  getItemCountSuccess: null,
};
const cartServer = createSlice({
  name: "cartServer",
  initialState,
  reducers: {
    getCartPending(state) {
      state.isGetCartLoading = true;
      state.error = null;
    },
    getCartSuccess(state, action) {
      state.cartData = {
        items: action.payload.carts,
        shipping: action.payload.shipping,
        tax: action.payload.tax,
      };
      state.isGetCartLoading = false;
      state.error = null;
    },
    getCartFail(state, action) {
      state.isGetCartLoading = false;
      state.error = action.payload;
    },

    addToCartPending(state) {
      state.isAddToCartLoading = true;
      state.error = null;
    },
    addToCartSuccess(state) {
      state.isAddToCartLoading = false;
      state.error = null;
    },
    addToCartFail(state, action) {
      state.isAddToCartLoading = false;
      state.error = action.payload;
    },

    updateItemCountPending(state) {
      state.isAddToCartLoading = true;
      state.error = null;
      state.updateItemCountSuccess = null;
    },
    updateItemCountSuccess(state) {
      state.isAddToCartLoading = false;
      state.error = null;
      state.updateItemCountSuccess = true;
    },
    updateItemCountFail(state) {
      state.isAddToCartLoading = false;
      state.error = null;
      state.updateItemCountSuccess = false;
    },

    removeCartItemPending(state) {
      state.isAddToCartLoading = true;
      state.error = null;
      state.removeItemSuccess = null;
    },
    removeCartItemSuccess(state) {
      state.isAddToCartLoading = false;
      state.error = null;
      state.removeItemSuccess = true;
    },
    removeCartItemFail(state, action) {
      state.isAddToCartLoading = true;
      state.error = action.payload;
      state.removeItemSuccess = false;
    },
    //counter
    getItemCountPending(state) {
      //debugger;
      state.countCartDataLoading = true;
      state.countCartDataError = null;
    },
    getItemCountSuccess(state, action) {
      //debugger;
      state.countCartDataLoading = true;
      state.countCartData = { count: action.payload.count };
      state.countCartDataError = null;
    },
    getItemCountFail(state, action) {
      //debugger;
      state.isAddToCartLoading = false;
      state.countCartData = { count: 0 };
      state.countCartDataError = action.payload;
    },
  },
});

export const {
  addToCartPending,
  addToCartSuccess,
  addToCartFail,
  getCartPending,
  getCartSuccess,
  getCartFail,
  updateItemCountPending,
  updateItemCountSuccess,
  updateItemCountFail,
  removeCartItemPending,
  removeCartItemSuccess,
  removeCartItemFail,
  getItemCountPending,
  getItemCountSuccess,
  getItemCountFail,
} = cartServer.actions;

export default cartServer.reducer;
