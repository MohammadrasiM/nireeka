import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  bikeChoose: 0,
  homePageData: null,
  countryError: "",
  countryMessage: "",
  countryReqSuccess: null,
  countryData: null,
  id_product: null,
  id_country: "222",
  statistics: null,
  isGetStatisticsLoading: false,
  getStatisticsError: false,
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setBikeChoose: (state, action) => {
      return {
        ...current(state),
        bikeChoose: action.payload,
      };
    },
    setHomePageData: (state, action) => {
      return {
        ...current(state),
        homePageData: action.payload,
      };
    },
    countryPending(state, action) {
      return {
        ...current(state),
        ...action.payload,
        countryReqSuccess: false,
      };
    },
    countrySuccess(state, action) {
      return {
        ...state,
        countryError: action.payload.error,
        countryMessage: action.payload.message,
        countryReqSuccess: action.payload.success,
        countryData: action.payload.data,
        countryUser: {},
      };
    },
    countryFail(state, action) {
      return {
        ...state,
        countryError: action.payload.error,
        countryMessage: action.payload.message,
        countryData: action.payload.error,
        countryReqSuccess: action.payload.success,
        countryUser: {},
      };
    },
    getStatisticsPending(state) {
      state.isGetStatisticsLoading = true;
    },
    getStatisticsSuccess(state, action) {
      state.isGetStatisticsLoading = false;
      state.getStatisticsError = false;
      state.statistics = action?.payload?.data;
    },
    getStatisticsFail(state, action) {
      state.isGetStatisticsLoading = false;
      state.getStatisticsError = action?.payload?.error;
      state.statistics = null;
    }
  },
});
export const {
  setBikeChoose,
  setHomePageData,
  countryPending,
  countrySuccess,
  countryFail,
  getStatisticsPending,
  getStatisticsFail,
  getStatisticsSuccess
} = homePageSlice.actions;

const reducer = {
  homePage: homePageSlice.reducer,
};
export default reducer;
