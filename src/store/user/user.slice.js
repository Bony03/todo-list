import { createSlice } from "@reduxjs/toolkit";
import { listenerMiddleware } from "../listernerMiddlewere/listernerMiddlewere";
import { systemLogOut } from "../system/system.slice";

const initialState = {
  name: "",
  surname: "",
  email: "",
  regDate: null,
  file: null,
  isActivated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.name = "";
      state.surname = "";
      state.email = "";
      state.regDate = "";
      state.file = null;
      state.isActivated = false;
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
      state.isActivated = action.payload.isActivated;
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

listenerMiddleware.startListening({
  type: "user/logOut",
  effect: (_, { dispatch }) => {
    dispatch(systemLogOut());
  },
});
