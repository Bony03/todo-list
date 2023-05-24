import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAuth,
  setAuthError,
  setLoading,
  setAuthSuccess,
  setProfileError,
} from "../../system/system.slice";
import { setToken, setUser } from "../user.slice";
import { loadTodos } from "../../todo/loadThunk/loadThunk";
import { loadPhoto } from "../loadPhotoThunk/loadPhotoThunk";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async function (userCredentials, { dispatch, getState }) {
    const prevError = getState((state) => state.system.error);
    if (prevError) {
      dispatch(setAuthError(""));
    }
    try {
      dispatch(setLoading(true));
      const response = await fetch("http://192.168.31.249:3001/auth/login", {
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
      dispatch(setAuthSuccess(data.message));
      dispatch(setToken(data.token));
      dispatch(setAuth(true));
      dispatch(setUser(data.user));
      if (data.user.todos) {
        dispatch(loadTodos());
      }
      if (data.user.photo) {
        dispatch(loadPhoto());
      }
      if (!data.user.name) {
        dispatch(setProfileError(`Need to set data in Settings`));
      }
      return;
    } catch (error) {
      console.log(error.message);
      dispatch(setAuthError(error.message));
    }
  }
);
