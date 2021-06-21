import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'presetMeals',
  initialState: [],
  reducers: {
    getPresetMeals: () => {},
    setPresetMeals: (state, { payload }) => payload,
    addIngredient: (state, { payload }) => {
      if (payload.ingredient._id)
        state
          .find((meal) => meal._id === payload._id)
          .ingredients.push(payload.ingredient);
    },
    modifyIngredient: (state, { payload }) => {
      state
        .find((meal) => meal._id === payload._id)
        .ingredients.find(
          (ingredient) => ingredient._id === payload.ingredient._id
        ).weight = payload.ingredient.weight;
    },
    removeIngredient: (state, { payload }) => {
      state.find((meal) => meal._id === payload._id).ingredients = state
        .find((meal) => meal._id === payload._id)
        .ingredients.filter(
          (ingredient) => ingredient._id !== payload.ingredient._id
        );
    },
    deletePresetMeal: (state, { payload }) =>
      state.filter((meal) => meal._id !== payload),
    addPresetMeal: (state, { payload }) => {
      if (payload._id) state.push(payload);
    },
    modifyPresetMeal: (state, { payload }) => {
      const index = state.findIndex((meal) => meal._id === payload._id);
      state[index].name = payload.name;
      (payload.ingredients || []).forEach((ingredient) => {
        state[index].ingredients[
          state[index].ingredients.findIndex(
            (ing) => ing._id === ingredient._id
          )
        ].weight = ingredient.weight;
      });
    },
  },
});

export const {
  getPresetMeals,
  addIngredient,
  modifyIngredient,
  removeIngredient,
  setPresetMeals,
  addPresetMeal,
  deletePresetMeal,
  modifyPresetMeal,
} = slice.actions;

export default slice.reducer;
