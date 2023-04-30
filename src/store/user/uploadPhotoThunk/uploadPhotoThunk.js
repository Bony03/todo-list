import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPhoto } from "../user.slice";
export const uploadPhoto = createAsyncThunk(
  "profile/uploadPhoto",
  async function (photo, { dispatch }) {
    try {
      const formData = new FormData();
      formData.append("file", photo);
      const response = await fetch("http://localhost:3001/profile/upload", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });

      const buffer = await response.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const file = new Blob([bytes.buffer]);
      dispatch(setPhoto(file));
      return;
    } catch (error) {
      console.log(error);
    }
  }
);
