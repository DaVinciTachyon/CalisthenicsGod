import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'exercises',
  initialState: [],
  reducers: {
    getExercises: () => {},
    setExercises: (state, { payload }) => payload,
    removeExercise: (state, { payload }) =>
      state.filter((exercise) => exercise._id !== payload),
    addExercise: (state, { payload }) => {
      if (payload._id) state.push(payload)
    },
    modifyExercise: (state, { payload }) => {
      const index = state.findIndex((exercise) => exercise._id === payload._id)
      state[index] = {
        ...state[index],
        ...payload,
      }
    },
  },
})

export const {
  getExercises,
  setExercises,
  removeExercise,
  addExercise,
  modifyExercise,
} = slice.actions

export default slice.reducer
