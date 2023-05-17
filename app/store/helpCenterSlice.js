import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  helpFullError: "",
  helpFullMessage: "",
  helpFullReqSuccess: "",
  helpFullData: null,
  helpFullUser: {},
  helpFullGuestError: "",
  helpFullGuestMessage: "",
  helpFullGuestReqSuccess: "",
  helpFullGuestData: null,
  helpFullGuestUser: {},
  searchError: "",
  searchMessage: "",
  searchReqSuccess: null,
  searchData: null,
  resultError: "",
  resultMessage: "",
  resultReqSuccess: null,
  resultData: null,
  topicData: null,
  topicId: null,
  getTopicIsLoading: false,
  getTopicError: false,
};
const helpCenterSlice = createSlice({
  name: "helpCenter",
  initialState,
  reducers: {
    // setSearchData: (state, action) => {
    //   return {
    //     ...current(state),
    //     searchData: action.payload,
    //   };
    // },
    helpFullPending(state, action) {
      return {
        ...current(state),
        ...action.payload,
        helpFullReqSuccess: false,
      };
    },
    helpFullSuccess(state, action) {
      return {
        ...state,
        helpFullError: action.payload.error,
        helpFullMessage: action.payload.message,
        helpFullReqSuccess: action.payload.success,
        helpFullData: action.payload.data,
        helpFullStatus: action.payload.status,
        helpFullUser: {},
      };
    },
    helpFullFail(state, action) {
      return {
        ...state,
        helpFullError: action.payload.error,
        helpFullMessage: action.payload.message,
        helpFullData: action.payload.error,
        helpFullReqSuccess: action.payload.success,
        helpFullStatus: action.payload.status,
        helpFullUser: {},
      };
    },
    helpFullGuestPending(state, action) {
      return {
        ...current(state),
        ...action.payload,
        helpFullGuestReqSuccess: false,
      };
    },
    helpFullGuestSuccess(state, action) {
      return {
        ...state,
        helpFullGuestError: action.payload.error,
        helpFullGuestMessage: action.payload.message,
        helpFullGuestReqSuccess: action.payload.success,
        helpFullGuestData: action.payload.data,
        helpFullGuestStatus: action.payload.status,
        helpFullGuestUser: {},
      };
    },
    helpFullGuestFail(state, action) {
      return {
        ...state,
        helpFullGuestError: action.payload.error,
        helpFullGuestMessage: action.payload.message,
        helpFullGuestData: action.payload.data,
        helpFullGuestReqSuccess: action.payload.success,
        helpFullGuestStatus: action.payload.status,
        helpFullGuestUser: {},
      };
    },
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
      };
    },
    //
    resultPending(state, action) {
      return {
        ...current(state),
        ...action.payload,
        resultReqSuccess: false,
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
      };
    },
    getTopicPending(state) {
      state.getTopicIsLoading = true;
      state.topicId = null;
    },
    getTopicSuccess(state, action) {
      state.getTopicIsLoading = false;
      state.getTopicError = false;
      state.topicData = action?.payload?.data;
      state.topicId = action?.payload?.data?.topic?.id;
    },
    getTopicFail(state, action) {
      state.getTopicIsLoading = false;
      state.getTopicError = action?.payload?.error;
      state.topicData = null;
    },
  },
});
export const {
  helpFullPending,
  helpFullSuccess,
  helpFullFail,
  helpFullGuestPending,
  helpFullGuestSuccess,
  helpFullGuestFail,
  searchPending,
  searchSuccess,
  searchFail,
  resultPending,
  resultSuccess,
  resultFail,
  getTopicFail,
  getTopicPending,
  getTopicSuccess
} = helpCenterSlice.actions;

const reducer = {
  helpCenter: helpCenterSlice.reducer,
};
export default reducer;
