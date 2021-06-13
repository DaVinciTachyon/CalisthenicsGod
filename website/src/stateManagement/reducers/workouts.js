import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'workouts',
  initialState: [],
  reducers: {
    setWorkouts: (state, { payload }) => payload || [],
    addWorkout: (state, { payload }) => {
      if (payload._id) state.unshift(payload);
    },
  },
});

export const { setWorkouts, addWorkout } = slice.actions;

export default slice.reducer;
