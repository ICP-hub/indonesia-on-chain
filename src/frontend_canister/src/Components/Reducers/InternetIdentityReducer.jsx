import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  identity: null,
  principal: null,
  loading: false,
  error: null,
};

const internetIdentitySlice = createSlice({
  name: "internet",
  initialState,
  reducers: {
    checkLoginOnStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { isAuthenticated, identity, principal } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.identity = identity;
      state.principal = principal;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.identity = null;
      state.principal = null;
      state.loading = false;
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  // setAuthClient,
  checkLoginOnStart,
  loginStart,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} = internetIdentitySlice.actions;

export default internetIdentitySlice.reducer;
