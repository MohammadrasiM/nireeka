import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bikeSettings: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setBikeSettings: (state, action) => {
      state.bikeSettings = action.payload;
    },
  },
});

export const { setBikeSettings } = dashboardSlice.actions;
export default dashboardSlice.reducer;
