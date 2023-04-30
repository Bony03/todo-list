import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  surname: "",
  email: "",
  regDate: null,
  file: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state = {
        name: "",
        surname: "",
        email: "",
        regDate: null,
      };
      localStorage.removeItem("token");
    },
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action) => {
      if (action.payload.name === undefined) {
        state.name = "";
        state.surname = "";
      } else {
        state.name = action.payload.name;
        state.surname = action.payload.surname;
      }
      state.email = action.payload.email;
      state.regDate = action.payload.regDate;
    },
    setName: (state, action) => {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
    },
    setPhoto: (state, action) => {
      state.file = action.payload;
    },
  },
});

export const { logOut, setToken, setUser, setName, setPhoto } =
  userSlice.actions;

export default userSlice.reducer;
