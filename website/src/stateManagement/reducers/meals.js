import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'meals',
  initialState: [],
  reducers: {
    getMeals: () => {},
    setMeals: (state, { payload }) => payload,
    addPresetMeal: (state, { payload }) => {
      if (payload._id) state.unshift(payload);
    },
    modifyIngredient: (state, { payload }) => {
      state
        .find((meal) => meal._id === payload._id)
        .ingredients.find(
          (ingredient) => ingredient._id === payload.ingredient._id
        ).weight = payload.ingredient.weight;
    },
    removeIngredient: (state, { payload }) => {
      const index = state.findIndex((meal) => meal._id === payload._id);
      state[index].ingredients = state[index].ingredients.filter(
        (ingredient) => ingredient._id !== payload.ingredient._id
      );
      if (state[index].ingredients.length === 0) state.splice(index, 1);
    },
    addIngredient: (state, { payload }) => {
      if (payload._id && payload.ingredient._id) {
        let index = state.findIndex((meal) => meal._id === payload._id);
        if (index === -1) {
          state.unshift({
            _id: payload._id,
            ingredients: [],
          });
          index = 0;
        }
        state[index].ingredients.push(payload.ingredient);
      }
    },
  },
});

export const {
  getMeals,
  setMeals,
  modifyIngredient,
  removeIngredient,
  addIngredient,
  addPresetMeal,
} = slice.actions;

export default slice.reducer;
