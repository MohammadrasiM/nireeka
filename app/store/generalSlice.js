import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bikes: null,
  isGetBikesLoading: false,
  getBikesError: false,
  fileIDDeleting: null,
  fileTypeDeleting: null
};
const general = createSlice({
  name: "general",
  initialState,
  reducers: {
    getBikesPending(state) {
      state.isGetBikesLoading = true;
    },
    getBikesSuccess(state, action) {
      state.isGetBikesLoading = false;
      state.getBikesError = false;
      state.bikes = action?.payload?.data;
    },
    getBikesFail(state, action) {
      state.isGetBikesLoading = false;
      state.getBikesError = action?.payload?.error;
      state.bikes = null;
    },
    deleteFilePending(state, action) {
      state.fileIDDeleting = action?.payload?.id;
      state.fileTypeDeleting = action?.payload?.type;
    },
    deleteFileSuccess(state) {
      state.fileIDDeleting = null;
      state.fileTypeDeleting = null;
    },
    deleteFileFail(state) {
      state.fileIDDeleting = null;
      state.fileTypeDeleting = null;
    }
  },
});

export const {
  getBikesFail,
  getBikesPending,
  getBikesSuccess,
  deleteFileFail,
  deleteFilePending,
  deleteFileSuccess
} = general.actions;

export default general.reducer;
