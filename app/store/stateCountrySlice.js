import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputValueErr: null,
};

const stateCountrySlice = createSlice({
  name: "stateCountrySlice",
  initialState,
  reducers: {
    setInputValueErr: (state, action) => {
      state.inputValueErr = action.payload;
    },
  },
});

export const { setInputValueErr } = stateCountrySlice.actions;

export default stateCountrySlice.reducer;
