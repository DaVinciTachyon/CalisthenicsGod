import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'measurements',
  initialState: {},
  reducers: {
    getMeasurements: () => {},
    getMeasurement: () => {},
    addMeasurements: () => {},
    setMeasurements: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        if (!state[key]) state[key] = [payload[key]];
        else if (state[key] && payload[key]._id !== state[key][0]._id)
          state[key].unshift(payload[key]);
      });
    },
    getMeasurementHistory: () => {},
    setMeasurementHistory: (state, { payload }) => ({
      ...state,
      [payload.name]: payload[payload.name],
    }),
  },
});

export const {
  setMeasurements,
  getMeasurements,
  addMeasurements,
  getMeasurement,
  getMeasurementHistory,
  setMeasurementHistory,
} = slice.actions;

export default slice.reducer;
