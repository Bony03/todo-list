import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearError,
  setLoading,
  setAuthError,
  setAuthSuccess,
} from "../../system/system.slice";

export const requestRecovery = createAsyncThunk(
  "auth/recover-password",
  async function (userEmail, { dispatch }) {
    dispatch(clearError());
    try {
      const response = await fetch(
        "http://192.168.31.249:3001/auth/request-reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );
      if (!response.ok) {
        dispatch(setLoading(false));
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      dispatch(setAuthSuccess(data.message));
    } catch (error) {
      console.log(error.message);
      dispatch(setAuthError(error.message));
    }
  }
);
