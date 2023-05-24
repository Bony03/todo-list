import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearError,
  setLoading,
  setAuthError,
  setAuthSuccess,
} from "../../system/system.slice";
export const recoverPassword = createAsyncThunk(
  "auth/recover-password",
  async function (userCredentials, { dispatch }) {
    dispatch(clearError());
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        "http://192.168.31.249:3001/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCredentials.token,
          },
          body: JSON.stringify({ password: userCredentials.password }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        dispatch(setLoading(false));
        throw new Error(data.message);
      }
      const data = await response.json();
      dispatch(setAuthSuccess(data.message));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error.message);
      dispatch(setAuthError(error.message));
    }
  }
);
