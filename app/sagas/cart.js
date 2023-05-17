import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  addToCartPending,
  addToCartSuccess,
  addToCartFail,
  getCartSuccess,
  getCartPending,
  getCartFail,
  updateItemCountSuccess,
  updateItemCountPending,
  updateItemCountFail,
  removeCartItemSuccess,
  removeCartItemPending,
  removeCartItemFail,
  //counterCount
  getItemCountSuccess,
  getItemCountPending,
  getItemCountFail,
} from "../store/cartServer";
import {
  addItemsToCart,
  getCartRequest,
  getItemCountRequest,
  removeCartItemRequest,
  updateItemCountRequest,
} from "app/api/cart";

function* handleGetCartPending() {
  try {
    const { data: res } = yield call(getCartRequest);

    if (res.data) {
      yield put(getCartSuccess(res.data));
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(getCartFail(error?.response?.data || { message: errorMessage }));
  }
}

function* handleAddToCartPending(action) {
  const items = action.payload;
  try {
    const res = yield call(addItemsToCart, items);

    if (res.data) {
      yield put(addToCartSuccess(res.data));
      yield put(getCartPending());
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(addToCartFail(error?.response?.data || { message: errorMessage }));
  }
}

function* handleUpdateItemCountPending(action) {
  const { id, count } = action.payload;

  try {
    const res = yield call(updateItemCountRequest, ...[id, count]);

    if (res.data) {
      yield put(updateItemCountSuccess(res.data));
      yield put(getCartPending());
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(updateItemCountFail(error?.response?.data || { message: errorMessage }));
  }
}

function* handleRemoveCartItemPending(action) {
  const id = action.payload;

  try {
    const res = yield call(removeCartItemRequest, id);
    if (res.data) {
      yield put(removeCartItemSuccess(res.data));
      yield put(getCartPending());
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(removeCartItemFail(error?.response?.data || { message: errorMessage }));
  }
}

function* handleGetItemCountPending() {
  try {
    const { data: res } = yield call(getItemCountRequest);
    debugger;
    if (res.data) {
      debugger;
      yield put(getItemCountSuccess(res.data));
    }
  } catch (error) {
    const errorMessage = "Can't reach server right now.";
    yield put(getItemCountFail(error?.response?.data || { message: errorMessage }));
    debugger;
  }
}

export function* watchRemoveCartItemPending() {
  yield takeEvery(removeCartItemPending.type, handleRemoveCartItemPending);
}

export function* watchGetCartPending() {
  yield takeEvery(getCartPending.type, handleGetCartPending);
}
export function* watchAddToCartPending() {
  yield takeEvery(addToCartPending.type, handleAddToCartPending);
}
export function* watchUpdateItemCountPending() {
  yield takeEvery(updateItemCountPending.type, handleUpdateItemCountPending);
}
export function* watchGetItemCountPending() {
  yield takeEvery(getItemCountPending.type, handleGetItemCountPending);
}
export default function* rootSaga() {
  yield all([
    fork(watchAddToCartPending),
    fork(watchGetCartPending),
    fork(watchUpdateItemCountPending),
    fork(watchRemoveCartItemPending),
    fork(watchGetItemCountPending),
  ]);
}
