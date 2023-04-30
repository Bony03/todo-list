import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuth } from "../../system/system.slice";
import { logOut, setToken, setUser } from "../user.slice";
import { loadPhoto } from "../loadPhotoThunk/loadPhotoThunk";
import { loadTodos } from "../../todo/loadThunk/loadThunk";

export const checkToken = createAsyncThunk(
  "user/checkToken",
  async function (_, { dispatch }) {
    if (localStorage.getItem("token")) {
      try {
        const response = await fetch("http://localhost:3001/auth/checkToken", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          const data = await response.json();
          if (data.message === "Token is invalid") {
            dispatch(logOut());
            return;
          }
          throw new Error(data.message);
        }
        const data = await response.json();
        dispatch(setAuth(true));
        dispatch(setToken(data.token));
        dispatch(setUser(data.user));
        if (data.user.todos) {
          dispatch(loadTodos());
        }
        if (data.user.photo) {
          dispatch(loadPhoto());
        }
        return;
      } catch (error) {
        console.log(error.message);
      }
    }
    return;
  }
);
