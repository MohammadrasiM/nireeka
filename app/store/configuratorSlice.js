import { createSlice } from "@reduxjs/toolkit";
import { PERFORMANCE_KEYS } from "../constants/performanceKeys";
import update from "lodash/update";
import findIndex from "lodash/findIndex";

const initialState = {
  bikesFilters: null,
  bikesFilterIsLoading: false,
  bikesFilterError: false,
  compareBikeInfoError: false,
  compareBikeInfo: null,
  compareBikeInfoIsLoading: false,
  mode: "normal",
  configuratorData: null,
  unit: 1,
  selectedParts: {},
  selectedMultipleParts: {},
  upgrades: [],
  preUpgrades: null,
  upgradesInCart: null,
  preUpgradePartsPrice: 0,
  selectedColor: null,
  selectedSize: null,
  availableColors: null,
  dates: null,
  performance: null,
  totalPrice: 0,
  hasAddedToCart: false,
  sendRateIsLoading: false,
  sendRateError: false,
  sendReviewIsLoading: false,
  sendReviewError: false,
  deleteReviewId: null,
  deleteReviewIsLoading: false,
  deleteReviewError: false,
};

const configuratorSlice = createSlice({
  name: "configurator",
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload;
    },

    setConfiguratorData(state, action) {
      state.configuratorData = action.payload;
    },

    setNewSelectedPart(state, action) {
      const oldPart = state.selectedParts[action.payload.category_part_id];

      for (let performanceKey of PERFORMANCE_KEYS) {
        // Removing old part performance
        if (
          oldPart &&
          oldPart.performance &&
          oldPart.performance[performanceKey] &&
          state.performance && state.performance[performanceKey]
        )
          state.performance[performanceKey] -= oldPart.performance[performanceKey];

        if (action.payload.performance && action.payload.performance[performanceKey] && state.performance && state.performance[performanceKey]) {
          state.performance[performanceKey] += action.payload.performance[performanceKey];
        }
      }

      state.selectedParts[action.payload.category_part_id] = action.payload;

      // Removing any other selected part of this category
      state.upgrades = state.upgrades.filter(
        (part) => part.category_part_id !== action.payload.category_part_id
      );
      // If the part was an upgrade, we add it to the upgrades
      if (action.payload.category_id === 3) state.upgrades.push(action.payload);
    },

    toggleSelectedMultiplePart(state, action) {
      const upgradesLengthBeforeFilter = state.upgrades.length;
      state.upgrades = state.upgrades.filter((part) => part.id !== action.payload.id);

      // If true, no item was removed; so we add it
      if (upgradesLengthBeforeFilter === state.upgrades.length) state.upgrades.push(action.payload);

      // Reference to the array
      let multipleChoiceArray = state.selectedMultipleParts[action.payload.category_part_id];

      if (!multipleChoiceArray) {
        state.selectedMultipleParts[action.payload.category_part_id] = [action.payload];
        return;
      }

      const sizeBeforeFilter = multipleChoiceArray.length;

      // Removing the part
      multipleChoiceArray = multipleChoiceArray.filter((part) => part.id !== action.payload.id);

      // If true, no item was removed; so we add it
      if (sizeBeforeFilter === multipleChoiceArray.length) multipleChoiceArray.push(action.payload);

      state.selectedMultipleParts[action.payload.category_part_id] = multipleChoiceArray;
    },

    setPreUpgrades(state, action) {
      state.preUpgrades = action.payload;
    },

    setUpgradesInCart(state, action) {
      state.upgradesInCart = action.payload;
    },

    setPreUpgradePartsPrice(state, action) {
      state.preUpgradePartsPrice = action.payload;
    },

    setSelectedColor(state, action) {
      state.selectedColor = action.payload;
    },

    setSelectedSize(state, action) {
      state.selectedSize = action.payload;
    },

    toggleUnit(state) {
      state.unit = (state.unit + 1) % 2;
    },

    setAvailableColors(state, action) {
      state.availableColors = action.payload;
    },

    setDates(state, action) {
      state.dates = action.payload;
    },

    setInitialPerformance(state, action) {
      state.performance = action.payload;
    },

    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },

    getBikesFiltersPending(state) {
      state.bikesFilterIsLoading = true;
    },
    getBikesFiltersSuccess(state, action) {
      state.bikesFilterIsLoading = false;
      state.bikesFilterError = false;
      state.bikesFilters = action?.payload?.data;
    },
    getBikesFiltersFail(state, action) {
      state.bikesFilterIsLoading = false;
      state.bikesFilterError = action?.payload?.error;
      state.bikesFilters = null;
    },

    getCompareBikeInfoPending(state) {
      state.compareBikeInfo = null;
      state.compareBikeInfoIsLoading = true;
    },
    getCompareBikeInfoSuccess(state, action) {
      state.compareBikeInfoIsLoading = false;
      state.compareBikeInfoError = false;
      state.compareBikeInfo = action?.payload?.data;
    },
    getCompareBikeInfoFail(state, action) {
      state.compareBikeInfoIsLoading = false;
      state.compareBikeInfoError = action?.payload?.error;
      state.compareBikeInfo = null;
    },

    resetConfiguratorState(state) {
      state.mode = "normal";
      state.configuratorData = null;
      state.unit = 0;
      state.selectedParts = {};
      state.selectedMultipleParts = {};
      state.upgrades = [];
      state.preUpgrades = null;
      state.selectedColor = null;
      state.selectedSize = null;
      state.availableColors = null;
      state.dates = null;
      state.performance = null;
      state.totalPrice = 0;
      state.hasAddedToCart = false;
    },

    setHasAddedToCart(state, action) {
      state.hasAddedToCart = action.payload;
    },
    sendRatePending(state) {
      state.sendRateIsLoading = true;
      state.sendRateError = false;
    },
    sendRateSuccess(state, action) {
      state.sendRateIsLoading = false;
      state.sendRateError = false;
      state.configuratorData.count_rating = action?.payload?.rate_count;
      state.configuratorData.rating_value = action?.payload?.rate_value;
    },
    sendRateFail(state, action) {
      state.sendRateIsLoading = false;
      state.sendRateError = action.payload;
    },
    sendReviewPending(state) {
      state.sendReviewIsLoading = true;
      state.sendReviewError = false;
    },
    sendReviewSuccess(state, action) {
      state.sendReviewIsLoading = false;
      state.sendReviewError = false;
      if(!!action?.payload) {
        state.configuratorData.rate_user = 0;
        state.configuratorData.count_reviews = state.configuratorData.count_reviews - 1;
        if(action?.payload?.recommend === 'Yes')
          state.configuratorData.count_recommended = state.configuratorData.count_recommended - 1;
        state.configuratorData.reviews.items = state.configuratorData?.reviews.items?.filter((item) => action?.payload?.id !== item?.id)
        try {
          update(state.configuratorData.rating_group, [findIndex(state.configuratorData.rating_group, ['rating', action?.payload?.rating]), 'count'], (rate) => rate - 1);
        } catch (e) {
          console.log(e)
        }
      }
    },
    sendReviewFail(state, action) {
      state.sendReviewIsLoading = false;
      state.sendReviewError = action.payload;
    },
    deleteReviewPending(state, action) {
      state.deleteReviewId = action?.payload?.id;
      state.deleteReviewIsLoading = true;
      state.deleteReviewError = false;
    },
    deleteReviewSuccess(state, action) {
      state.deleteReviewIsLoading = false;
      state.deleteReviewError = false;
      state.deleteReviewId = null;
      state.configuratorData.rate_user = 0;
      state.configuratorData.count_reviews = state.configuratorData.count_reviews - 1;
      if(action?.payload?.recommend === 'Yes')
        state.configuratorData.count_recommended = state.configuratorData.count_recommended - 1;
      state.configuratorData.reviews.items = state.configuratorData?.reviews.items?.filter((item) => action?.payload?.id !== item?.id)
      try {
        update(state.configuratorData.rating_group, [findIndex(state.configuratorData.rating_group, ['rating', action?.payload?.rating]), 'count'], (rate) => rate - 1);
      } catch (e) {
        console.log(e)
      }
    },
    deleteReviewFail(state, action) {
      state.deleteReviewId = null;
      state.deleteReviewIsLoading = false;
      state.deleteReviewError = action.payload;
    },
    // Reducers that trigger sagas
    callGetAvailableColorsBySize() { },
    callGetDateBySizeAndColor() { },
  },
});

export const {
  setMode,
  setConfiguratorData,
  setBikeSlug,
  setNewSelectedPart,
  toggleSelectedMultiplePart,
  setPreUpgrades,
  setUpgradesInCart,
  setPreUpgradePartsPrice,
  setSelectedColor,
  setSelectedSize,
  toggleUnit,
  setAvailableColors,
  setDates,
  setInitialPerformance,
  setTotalPrice,
  resetConfiguratorState,
  setHasAddedToCart,
  callGetAvailableColorsBySize,
  callGetDateBySizeAndColor,
  getBikesFiltersFail,
  getBikesFiltersPending,
  getBikesFiltersSuccess,
  getCompareBikeInfoFail,
  getCompareBikeInfoPending,
  getCompareBikeInfoSuccess,
  sendRateFail,
  sendRatePending,
  sendRateSuccess,
  sendReviewFail,
  sendReviewPending,
  sendReviewSuccess,
  deleteReviewFail,
  deleteReviewPending,
  deleteReviewSuccess
} = configuratorSlice.actions;
export default configuratorSlice.reducer;
