import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  searchError: "",
  searchMessage: "",
  searchReqSuccess: null,
  searchData: null,
  resultError: "",
  resultMessage: "",
  resultReqSuccess: null,
  resultData: null,
  isResultLoading: false,
  searchQuery: null,
};
const spareSlice = createSlice({
  name: "spares",
  initialState,
  reducers: {
    searchPending(state, action) {
      return {
        ...current(state),
        ...action.payload,
        searchReqSuccess: false,
      };
    },
    searchSuccess(state, action) {
      return {
        ...state,
        searchError: action.payload.error,
        searchMessage: action.payload.message,
        searchReqSuccess: action.payload.success,
        searchData: action.payload.data,
        searchUser: {},
      };
    },
    searchFail(state, action) {
      return {
        ...state,
        searchError: action.payload.error,
        searchMessage: action.payload.message,
        searchData: action.payload.error,
        searchReqSuccess: action.payload.success,
        searchUser: {},
        isLoading: false,
      };
    },
    //
    resultPending(state, action) {
      return {
        ...current(state),
        ...action.payload,
        resultReqSuccess: false,
        searchQuery: action.payload,
        isResultLoading: true,
        resultData: null,
      };
    },
    resultSuccess(state, action) {
      return {
        ...state,
        resultError: action.payload.error,
        resultMessage: action.payload.message,
        resultReqSuccess: action.payload.success,
        resultData: action.payload.data,
        resultUser: {},
        isResultLoading: false,
      };
    },
    resultFail(state, action) {
      return {
        ...state,
        resultError: action.payload.error,
        resultMessage: action.payload.message,
        resultData: action.payload.error,
        resultReqSuccess: action.payload.success,
        resultUser: {},
        isResultLoading: false,
      };
    },
    resetSearchResult(state) {
      state.resultData = null;
    },
  },
});
export const {
  searchPending,
  searchSuccess,
  searchFail,
  resultPending,
  resultSuccess,
  resultFail,
  resetSearchResult,
} = spareSlice.actions;

const reducer = {
  spares: spareSlice.reducer,
};
export default reducer;
