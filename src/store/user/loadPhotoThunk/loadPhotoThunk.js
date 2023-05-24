import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPhoto } from "../user.slice";
export const loadPhoto = createAsyncThunk(
  "profile/loadPhoto",
  async function (_, { dispatch }) {
    const response = await fetch("http://192.168.31.249:3001/profile/load", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const buffer = await response.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const file = new Blob([bytes.buffer]);
    dispatch(setPhoto(file));
    return;
  }
);
