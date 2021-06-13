import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUserInfo: (state, { payload }) => ({ ...state, ...payload }),
    modifyUserInfo: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { setUserInfo, modifyUserInfo } = slice.actions;

export default slice.reducer;
