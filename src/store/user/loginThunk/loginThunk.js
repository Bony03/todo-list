import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAuth,
  setAuthError,
  setLoading,
  setAuthSuccess,
} from "../../system/system.slice";
import { setToken, setUser } from "../user.slice";
import { loadTodos } from "../../todo/loadThunk/loadThunk";
import { loadPhoto } from "../loadPhotoThunk/loadPhotoThunk";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async function (userCredentials, { dispatch, getState }) {
    console.log("login thunk");
    const prevError = getState((state) => state.system.error);
    if (prevError) {
      dispatch(setAuthError(""));
    }
    try {
      dispatch(setLoading(true));
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });
      if (!response.ok) {
        dispatch(setLoading(false));
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      dispatch(setLoading(false));
      dispatch(setAuth(true));
      dispatch(setUser(data.user));
      dispatch(setToken(data.token));
      dispatch(setAuthSuccess(data.message));
      if (data.user.todos) {
        dispatch(loadTodos());
      }
      if (data.user.photo) {
        dispatch(loadPhoto());
      }
      return;
    } catch (error) {
      console.log(error.message);
      dispatch(setAuthError(error.message));
    }
  }
);
