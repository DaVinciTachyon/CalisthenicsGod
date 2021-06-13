import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'measurements',
  initialState: {},
  reducers: {
    addMeasurements: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        if (payload[key] && payload[key]._id) {
          if (!state[key]) state[key] = [payload[key]];
          else if (state[key] && payload[key]._id !== state[key][0]._id)
            state[key].unshift(payload[key]);
        }
      });
    },
    setMeasurements: (state, { payload }) => {
      if (payload)
        Object.keys(payload).forEach((key) => {
          if (!state[key]) state[key] = [payload[key]];
          else if (state[key] && payload[key]._id !== state[key][0]._id)
            state[key].unshift(payload[key]);
        });
    },
    setMeasurement: (state, { payload }) => {
      if (typeof payload !== 'string')
        Object.keys(payload).forEach((key) => {
          if (payload[key] && payload[key]._id) {
            if (!state[key]) state[key] = [payload[key]];
            else if (state[key] && payload[key]._id !== state[key][0]._id)
              state[key].unshift(payload[key]);
          }
        });
    },
    getMeasurementHistory: (state, { payload }) => {
      if (payload.name) state[payload.name] = payload[payload.name];
    },
  },
});

export const {
  addMeasurements,
  setMeasurements,
  getMeasurementHistory,
  setMeasurement,
} = slice.actions;

export default slice.reducer;
