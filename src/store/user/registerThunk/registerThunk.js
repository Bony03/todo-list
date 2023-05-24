import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAuth,
  setAuthError,
  setLoading,
  setAuthSuccess,
  setProfileError,
} from "../../system/system.slice";
import { setToken, setUser } from "../user.slice";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async function (userCredentials, { dispatch, getState }) {
    try {
      const prevError = getState((state) => state.system.error);
      if (prevError) {
        dispatch(setAuthError(""));
      }
      dispatch(setLoading(true));
      const response = await fetch(
        "http://192.168.31.249:3001/auth/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
          },
          body: JSON.stringify(userCredentials),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        dispatch(setLoading(false));
        throw new Error(data.message);
      }
      const data = await response.json();
      dispatch(setLoading(false));
      dispatch(setAuth(true));
      dispatch(setUser(data.user));
      dispatch(setAuthSuccess(data.message));
      dispatch(setToken(data.token));
      dispatch(setProfileError(`Need to set data in Settings`));
      return;
    } catch (error) {
      console.log(error.message);
      dispatch(setAuthError(error.message));
    }
  }
);
