import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    getUserInfo: () => {},
    setUserInfo: (state, { payload }) => ({ ...state, ...payload }),
    modifyUserInfo: (state, { payload }) => ({ ...state, ...payload }),
    getNutritionInfo: () => {},
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
  getUserInfo,
  getNutritionInfo,
  setUserInfo,
  modifyUserInfo,
  setNutritionInfo,
  modifyNutritionInfo,
} = slice.actions;

export default slice.reducer;
