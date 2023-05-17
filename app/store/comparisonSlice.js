import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  size: 0,
  bikes: [],
};

const comparisonSlice = createSlice({
  initialState,
  name: "comparison",
  reducers: {
    setSize(state, action) {
      state.size = action.payload;
    },
    setBikes(state, action) {
      state.bikes = action.payload;
    },
  },
});

export const { setSize, setBikes } = comparisonSlice.actions;
export default comparisonSlice.reducer;
