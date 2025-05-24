import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'request',
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArr = state.filter((r) => r._id !== action.payload);
      return newArr;
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
