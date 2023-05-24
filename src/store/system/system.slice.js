import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  loading: false,
  showSign: false,
  authSuccess: null,
  todosSuccess: null,
  profileSuccess: null,
  authError: null,
  todosError: null,
  profileError: null,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    closeSign: (state, action) => {
      state.showSign = false;
    },
    openSign: (state, action) => {
      state.showSign = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setAuthError: (state, action) => {
      state.authError = action.payload;
    },
    setTodosError: (state, action) => {
      state.todosError = action.payload;
    },
    setProfileError: (state, action) => {
      state.profileError = action.payload;
    },
    setAuthSuccess: (state, action) => {
      state.authSuccess = action.payload;
    },
    setTodosSuccess: (state, action) => {
      state.todosSuccess = action.payload;
    },
    setProfileSuccess: (state, action) => {
      state.profileSuccess = action.payload;
    },
    clearError: (state, action) => {
      state.authError = null;
      state.todosError = null;
      state.profileError = null;
    },
    systemLogOut: (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.showSign = false;
      state.authSuccess = null;
      state.todosSuccess = null;
      state.profileSuccess = null;
      state.authError = null;
      state.todosError = null;
      state.profileError = null;
    },
    clearAllNotifications: (state, action) => {
      state.authSuccess = null;
      state.todosSuccess = null;
      state.profileSuccess = null;
      state.authError = null;
      state.todosError = null;
      state.profileError = null;
    },
  },
});

export const {
  closeSign,
  openSign,
  setLoading,
  setAuth,
  setAuthSuccess,
  setAuthError,
  setTodosSuccess,
  setTodosError,
  setProfileSuccess,
  setProfileError,
  clearError,
  systemLogOut,
  clearAllNotifications,
} = systemSlice.actions;
export default systemSlice.reducer;
