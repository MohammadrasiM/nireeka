import { all, call, fork, put, takeLatest, select, takeEvery } from "redux-saga/effects";
import {getAvailableColorsBySize, getConfiguratorBikesFilters, getBikesFilters, getDateBySizeAndColor, getConfiguratorBikeInfo, sendRateBike, sendReviewBike, editReviewBike, deleteReviewBike} from "../api/configurator";
import { COLOR_TYPES } from "../constants/colorTypes";
import {
  callGetAvailableColorsBySize,
  callGetDateBySizeAndColor,
  getBikesFiltersFail, getBikesFiltersPending, getBikesFiltersSuccess,
  getCompareBikeInfoFail, getCompareBikeInfoPending, getCompareBikeInfoSuccess,
  setAvailableColors,
  setDates,
  setSelectedColor,
  sendRateFail,
  sendRatePending,
  sendRateSuccess,
  sendReviewFail,
  sendReviewPending,
  sendReviewSuccess,
  deleteReviewPending,
  deleteReviewFail,
  deleteReviewSuccess
} from "../store/configuratorSlice";
import {toast} from "react-toastify";

function* handleGetAvailableColorsBySize(action) {
  try {
    const response = yield call(
      getAvailableColorsBySize,
      ...[action.payload.productId, action.payload.sizeId]
    );

    const availableColors = response.available;
    yield put(setAvailableColors(availableColors));

    const preUpgradesColorId = yield select((state) => state.configurator.preUpgrades?.color_id);

    // Initializing color
    let colorToBeSelected = null;
    for (let i = 0; i < COLOR_TYPES.length; i++) {
      if (!availableColors[COLOR_TYPES[i]] || availableColors[COLOR_TYPES[i]].length === 0)
        continue;

      if (!colorToBeSelected) colorToBeSelected = availableColors[COLOR_TYPES[i]][0];
      // Finding pre upgrade color id in new available colors
      for (let color of availableColors[COLOR_TYPES[i]]) {
        if (color.id === preUpgradesColorId) {
          colorToBeSelected = color;
          i = COLOR_TYPES.length; // Breaking the outer for loop
          break;
        }
      }
    }

    yield put(setSelectedColor(colorToBeSelected));
    yield put(
      callGetDateBySizeAndColor({
        productId: action.payload.productId,
        sizeId: action.payload.sizeId,
        colorId: colorToBeSelected.id,
      })
    );
  } catch (error) {
    yield put(setAvailableColors({}));
  }
}

export function* watchGetAvailableColorsBySize() {
  yield takeLatest(callGetAvailableColorsBySize.type, handleGetAvailableColorsBySize);
}

function* handleGetDateBySizeAndColor(action) {
  try {
    const response = yield call(
      getDateBySizeAndColor,
      ...[action.payload.productId, action.payload.sizeId, action.payload.colorId]
    );

    yield put(setDates(response));
  } catch (error) {
    yield put(setDates(null));
  }
}

export function* watchGetDateBySizeAndColor() {
  yield takeLatest(callGetDateBySizeAndColor.type, handleGetDateBySizeAndColor);
}


function* handleGetBikesFiltersPending(action) {
  try {
    const res = yield call(action?.payload?.isInventory ? getBikesFilters : getConfiguratorBikesFilters, action?.payload?.queryObject);
    if (res) {
      yield put(getBikesFiltersSuccess(res));
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(getBikesFiltersFail(error?.response?.data || { message: errorMessage }));
  }
}

export function* handleGetCountries() {
  yield takeEvery(getBikesFiltersPending.type, handleGetBikesFiltersPending);
}


function* handleConfiguratorCompareInfo(action) {
  try {
    const res = yield call(getConfiguratorBikeInfo, action?.payload?.id);
    if (res) {
      yield put(getCompareBikeInfoSuccess(res));
      if(action?.payload.onSuccess) action?.payload.onSuccess(res?.data)
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(getCompareBikeInfoFail(error?.response?.data || { message: errorMessage }));
  }
}

export function* handleGetConfiguratorCompareInfo() {
  yield takeEvery(getCompareBikeInfoPending.type, handleConfiguratorCompareInfo);
}

function* handleSendRatePending(action) {
  try {
    const res = yield call(sendRateBike, action?.payload);
    if (res) {
      yield put(sendRateSuccess(res?.data));
      toast.success(res?.message || "Your Rate sent successfully.");
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(sendRateFail(error?.response?.data || { message: errorMessage }));
    if(!!error?.response?.data?.message)
      toast.error(error?.response?.data?.message);
  }
}

export function* watchSendRate() {
  yield takeEvery(sendRatePending.type, handleSendRatePending);
}

function* handleSendReviewPending(action) {
  try {
    const res = yield call(!!action?.payload?.review ? editReviewBike : sendReviewBike, action?.payload?.data, action?.payload?.review?.id);
    if (res) {
      yield put(sendReviewSuccess(action?.payload?.review));
      if(action?.payload.onSuccess) action?.payload.onSuccess()
      toast.success(res?.message || "Your Review sent successfully.");
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(sendReviewFail(error?.response?.data || { message: errorMessage }));
    if(!!error?.response?.data?.message)
      toast.error(error?.response?.data?.message);
    else if(error?.response?.data?.errors?.body?.length)
      toast.error(error?.response?.data?.errors?.body?.join('.'));
  }
}

export function* watchSendReview() {
  yield takeEvery(sendReviewPending.type, handleSendReviewPending);
}

function* handleDeleteReviewPending(action) {
  try {
    const res = yield call(deleteReviewBike, action?.payload?.id);
    if (res) {
      yield put(deleteReviewSuccess(action?.payload));
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(deleteReviewFail(error?.response?.data || { message: errorMessage }));
    if(!!error?.response?.data?.message)
      toast.error(error?.response?.data?.message);
  }
}

export function* watchDeleteReview() {
  yield takeEvery(deleteReviewPending.type, handleDeleteReviewPending);
}


export default function* rootSaga() {
  yield all([fork(watchGetAvailableColorsBySize), fork(watchGetDateBySizeAndColor), fork(handleGetCountries), fork(handleGetConfiguratorCompareInfo), fork(watchSendRate), fork(watchSendReview), fork(watchDeleteReview)]);
}
