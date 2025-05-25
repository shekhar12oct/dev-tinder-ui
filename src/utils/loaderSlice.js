// utils/loaderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    loadingCount: 0,
  },
  reducers: {
    showLoader: (state) => {
      state.loadingCount += 1;
    },
    hideLoader: (state) => {
      state.loadingCount = Math.max(state.loadingCount - 1, 0);
    },
    resetLoader: (state) => {
      state.loadingCount = 0;
    },
  },
});

export const { showLoader, hideLoader, resetLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
