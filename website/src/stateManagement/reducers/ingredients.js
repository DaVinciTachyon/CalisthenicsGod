import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'ingredients',
  initialState: [],
  reducers: {
    addIngredient: (state, { payload }) => {
      if (payload._id) state.push(payload);
    },
    setIngredients: (state, { payload }) => payload || [],
    changeAvailability: (state, { payload }) => {
      state.find((ingredient) => ingredient._id === payload._id).isAvailable =
        !payload.isAvailable;
    },
    patchIngredient: (state, { payload }) => {
      const index = state.findIndex(
        (ingredient) => ingredient._id === payload._id
      );
      state[index] = {
        ...payload,
        ...state[index],
      };
    },
  },
});

export const {
  addIngredient,
  setIngredients,
  changeAvailability,
  patchIngredient,
} = slice.actions;

export default slice.reducer;
