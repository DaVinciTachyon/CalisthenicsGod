import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'ingredients',
  initialState: {
    available: [],
    unavailable: [],
  },
  reducers: {
    addIngredient: (state, { payload }) => {
      state.available.push(payload);
    },
    setIngredients: (state, { payload }) => ({ ...state, ...payload }),
    changeAvailability: (state, { payload }) => {
      if (payload.isAvailable)
        state.available = swapAvailability(
          state.available,
          state.unavailable,
          payload._id
        );
      else
        state.unavailable = swapAvailability(
          state.unavailable,
          state.available,
          payload._id
        );
    },
    patchIngredient: (state, { payload }) => {
      let index = state.available.findIndex(
        (ingredient) => ingredient._id === payload._id
      );
      if (index === -1) {
        index = state.unavailable.findIndex(
          (ingredient) => ingredient._id === payload._id
        );
        state.unavailable[index] = payload;
      } else state.available[index] = payload;
    },
  },
});

const swapAvailability = (original, swapped, id) => {
  if (!swapped.find((ingredient) => ingredient._id === id))
    swapped.push(original.find((ingredient) => ingredient._id === id));
  return original.filter((ingredient) => ingredient._id !== id);
};

export const {
  addIngredient,
  setIngredients,
  changeAvailability,
  patchIngredient,
} = slice.actions;

export default slice.reducer;
