import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPhoto } from "../user.slice";
import {
  setProfileError,
  setProfileSuccess,
  clearAllNotifications,
} from "../../system/system.slice";
import { logOut } from "../user.slice";
export const uploadPhoto = createAsyncThunk(
  "profile/uploadPhoto",
  async function (photo, { dispatch }) {
    try {
      dispatch(clearAllNotifications());
      const formData = new FormData();
      formData.append("file", photo);
      const response = await fetch(
        "http://192.168.31.249:3001/profile/upload",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        }
      );
      if (!response.ok) {
        const data = await response.json();
        if (data.message === "Token is not valid") {
          dispatch(logOut());
          return;
        }
        throw new Error(data.message);
      }
      if (response.ok) {
        dispatch(setProfileSuccess("Photo uploaded successfully"));
      }
      const buffer = await response.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const file = new Blob([bytes.buffer]);
      dispatch(setPhoto(file));
      return;
    } catch (error) {
      console.log(error);
      dispatch(setProfileError());
    }
  }
);
