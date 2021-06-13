import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'stages',
  initialState: [],
  reducers: {
    setStages: (state, { payload }) => payload || [],
    removeStage: (state, { payload }) =>
      state.filter((stage) => stage._id !== payload),
    addStage: (state, { payload }) => {
      if (payload._id)
        state.splice(payload.chronologicalRanking, 0, {
          _id: payload._id,
          name: payload.name,
          description: payload.description,
        });
    },
    modifyStage: (state, { payload }) => {
      state[state.findIndex((stage) => stage._id === payload._id)] = payload;
    },
  },
});

export const { setStages, removeStage, addStage, modifyStage } = slice.actions;

export default slice.reducer;
