import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'exercises',
  initialState: [],
  reducers: {
    setExercises: (state, { payload }) => payload || [],
    removeExercise: (state, { payload }) =>
      state.filter((exercise) => exercise._id !== payload),
    addExercise: (state, { payload }) => {
      if (payload._id) state.push(payload);
    },
    modifyExercise: (state, { payload }) => {
      state[state.findIndex((exercise) => exercise._id === payload._id)] =
        payload;
    },
  },
});

export const { setExercises, removeExercise, addExercise, modifyExercise } =
  slice.actions;

export default slice.reducer;
