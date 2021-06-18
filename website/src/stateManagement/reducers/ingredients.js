import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'ingredients',
  initialState: [],
  reducers: {
    getIngredients: () => {},
    setIngredients: (state, { payload }) => payload,
    addIngredient: (state, { payload }) => {
      if (payload._id) state.push(payload);
    },
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
  getIngredients,
  changeAvailability,
  patchIngredient,
} = slice.actions;

export default slice.reducer;
