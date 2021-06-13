import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUserInfo: (state, { payload }) => ({ ...state, ...payload }),
    modifyUserInfo: (state, { payload }) => ({ ...state, ...payload }),
    setNutritionInfo: (state, { payload }) => ({
      ...state,
      nutrition: { ...payload },
    }),
    modifyNutritionInfo: (state, { payload }) => ({
      ...state,
      nutrition: { ...payload },
    }),
  },
});

export const {
  setUserInfo,
  modifyUserInfo,
  setNutritionInfo,
  modifyNutritionInfo,
} = slice.actions;

export default slice.reducer;
