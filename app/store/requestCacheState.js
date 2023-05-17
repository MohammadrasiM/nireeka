import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippedOrders: null,
};

const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    setShippedOrdersCache(state, action) {
      state.shippedOrders = action.payload;
    },
  },
});

export const { setShippedOrdersCache } = cacheSlice.actions;
export default cacheSlice.reducer;
