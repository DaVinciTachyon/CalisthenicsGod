import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    logIn: (state, { payload }) => {
      if (payload.Authentication) {
        localStorage.setItem(
          'user',
          JSON.stringify({ authToken: payload.Authentication })
        );
        window.location = '/';
      }
    },
    logOut: (state, { payload }) => {
      localStorage.removeItem('user');
      window.location.reload();
    },
    register: (state, { payload }) => {
      if (!payload) window.location = '/login';
    },
  },
});

export const { logIn, logOut, register } = slice.actions;

export default slice.reducer;
