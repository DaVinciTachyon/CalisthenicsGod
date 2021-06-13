import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    logIn: (state, { payload }) => {
      if (payload.Authentication) {
        localStorage.setItem(
          //FIXME unsafe using local storage
          'authToken',
          payload.Authentication
        );
        window.location = '/';
      }
    },
    logOut: (state, { payload }) => {
      localStorage.removeItem('authToken');
      window.location.reload();
    },
    register: (state, { payload }) => {
      if (!payload) window.location = '/login';
    },
  },
});

export const { logIn, logOut, register } = slice.actions;

export default slice.reducer;
