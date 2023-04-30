import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setProfileError,
  setLoading,
  setProfileSuccess,
} from "../../system/system.slice";
import { setToken } from "../user.slice";

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async function (password, { dispatch }) {
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        "http://localhost:3001/auth/change-password",
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
        dispatch(setLoading(false));
        throw new Error(data.message);
      }
      const data = response.json();
      dispatch(setLoading(false));
      dispatch(setProfileSuccess(data.message));
      dispatch(setToken(data.token));
      return;
    } catch (error) {
      console.log(error.message);
      dispatch(setProfileError(error.message));
    }
  }
);
