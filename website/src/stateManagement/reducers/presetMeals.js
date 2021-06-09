import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'presetMeals',
  initialState: [],
  reducers: {
    addIngredient: (state, { payload }) => {
      //TODO
      //   state.push(payload);
      console.log('reducer', payload);
    },
    setPresetMeals: (state, { payload }) => payload || [],
    deletePresetMeal: (state, { payload }) =>
      state.filter((meal) => meal._id !== payload),
  },
});

export const { addIngredient, setPresetMeals, deletePresetMeal } =
  slice.actions;

export default slice.reducer;
