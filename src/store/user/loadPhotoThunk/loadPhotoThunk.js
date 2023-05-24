import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPhoto, logOut } from "../user.slice";
import {
  clearAllNotifications,
  setProfileError,
} from "../../system/system.slice";
export const loadPhoto = createAsyncThunk(
  "profile/loadPhoto",
  async function (_, { dispatch }) {
    try {
      dispatch(clearAllNotifications());
      const response = await fetch("http://192.168.31.249:3001/profile/load", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        const data = await response.json();
        if (data.message === "Token is not valid") {
          dispatch(logOut());
          return;
        }
        throw new Error(data.message);
      }
      const buffer = await response.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const file = new Blob([bytes.buffer]);
      dispatch(setPhoto(file));
      return;
    } catch (error) {
      console.log(error.message);
      dispatch(setProfileError(error.message));
    }
  }
);
