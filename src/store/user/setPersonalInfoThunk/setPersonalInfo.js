import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setLoading,
  setProfileError,
  setProfileSuccess,
} from "../../system/system.slice";
import { setToken, setUser } from "../user.slice";
export const setPersonalInfo = createAsyncThunk(
  "auth/setPersonalInfo",
  async function (userCredentials, { dispatch }) {
    try {
      dispatch(setLoading(true));
      const response = await fetch("http://localhost:3001/profile/userinfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(userCredentials),
      });
      if (!response.ok) {
        const data = await response.json();
        dispatch(setLoading(false));
        throw new Error(data.message);
      }
      const data = await response.json();
      dispatch(setUser(data.user));
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
