import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuth, setProfileError } from "../../system/system.slice";
import { logOut, setUser } from "../user.slice";
import { loadPhoto } from "../loadPhotoThunk/loadPhotoThunk";
import { loadTodos } from "../../todo/loadThunk/loadThunk";

export const checkToken = createAsyncThunk(
  "user/checkToken",
  async function (_, { dispatch }) {
    if (localStorage.getItem("token")) {
      try {
        const response = await fetch(
          "http://192.168.31.249:3001/auth/checkToken",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
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
        const data = await response.json();
        dispatch(setAuth(true));
        dispatch(setUser(data.user));
        localStorage.setItem("token", data.token);
        if (data.user.todos) {
          dispatch(loadTodos());
        }
        if (data.user.photo) {
          dispatch(loadPhoto());
        }
        if (!data.user.name) {
          dispatch(setProfileError(`Need to set data in Settings`));
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    return;
  }
);
