import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  promoCodeError: "",
  promoCodeMessage: "",
  promoCodeReqSuccess: null,
  promoCodeData: {},
};
const promoCode = createSlice({
  name: "promoCode",
  initialState,
  reducers: {
    ////////////////////////////////

    ////////////////////////////////
    getpromoCodePending(state, action) {
      return {
        ...current(state),
        ...action.payload,
        promoCodeReqSuccess: false,
      };
    },
    getpromoCodeSuccess(state, action) {
      return {
        ...state,
        promoCodeError: action.payload.error,
        promoCodeMessage: action.payload.message,
        promoCodeReqSuccess: action.payload.success,
        promoCodeData: action.payload.data,
        promoCodeStatus: action.payload.status,
        promoCodeUser: {},
      };
    },
    getpromoCodeFail(state, action) {
      return {
        ...state,
        promoCodeError: action.payload.error,
        promoCodeMessage: action.payload.message,
        promoCodeData: action.payload.error,
        promoCodeReqSuccess: action.payload.success,
        promoCodeStatus: action.payload.status,
        promoCodeUser: {},
      };
    },
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////
  },
});
export const { getpromoCodeSuccess, getpromoCodePending, getpromoCodeFail } =
  promoCode.actions;

// const reducer = {
//   promoCode: promoCode.reducer,
// };
export default promoCode.reducer;
