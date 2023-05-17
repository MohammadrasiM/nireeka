import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentModal: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    pushModal: (state, action) => {
      state.currentModal = action.payload.modal;
    },
    popCurrentModal: (state) => {
      state.currentModal = null;
    },
  },
});
export const { pushModal, popCurrentModal } = modalSlice.actions;
export default modalSlice.reducer;
