import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setLoading,
  setProfileError,
  setProfileSuccess,
} from "../../system/system.slice";
import { setToken, setUser, logOut } from "../user.slice";
export const setPersonalInfo = createAsyncThunk(
  "auth/setPersonalInfo",
  async function (userCredentials, { dispatch }) {
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        "http://192.168.31.249:3001/profile/userinfo",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(userCredentials),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        if (data.message === "Token is not valid") {
          dispatch(setLoading(false));
          dispatch(logOut());
          return;
        }
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
