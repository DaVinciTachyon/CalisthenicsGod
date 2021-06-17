import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    logIn: (state, { payload }) => {
      if (payload.Authentication)
        localStorage.setItem(
          //FIXME unsafe using local storage
          'authToken',
          payload.Authentication
        );
    },
    logOut: (state, { payload }) => {
      localStorage.removeItem('authToken');
    },
    register: (state, { payload }) => {},
  },
});

export const { logIn, logOut, register } = slice.actions;

export default slice.reducer;
