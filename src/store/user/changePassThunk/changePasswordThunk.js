import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAuthError,
  setLoading,
  setAuthSuccess,
  clearAllNotifications,
} from "../../system/system.slice";
import { logOut } from "../user.slice";
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async function (password, { dispatch }) {
    try {
      dispatch(clearAllNotifications());
      dispatch(setLoading(true));
      const response = await fetch(
        "http://192.168.31.249:3001/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(password),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.message === "Token is not valid") {
          dispatch(setLoading(false));
          dispatch(logOut());
          return;
        }
        dispatch(setLoading(false));
        throw new Error(data.message);
      }
      const data = await response.json();
      dispatch(setLoading(false));
      dispatch(setAuthSuccess(data.message));
      localStorage.setItem("token", data.token);
      return;
    } catch (error) {
      console.log(error.message);
      dispatch(setAuthError(error.message));
    }
  }
);
