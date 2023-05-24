import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setTodosError,
  setLoading,
  setTodosSuccess,
  clearAllNotifications,
} from "../../system/system.slice";
import { logOut } from "../../user/user.slice";
export const saveTodos = createAsyncThunk(
  "todos/saveTodos",
  async function (todos, { dispatch }) {
    try {
      dispatch(clearAllNotifications());
      dispatch(setLoading(true));
      const response = await fetch("http://192.168.31.249:3001/todos/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ todos }),
      });
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
      dispatch(setLoading(false));
      dispatch(setTodosSuccess(data.message));
      localStorage.setItem("token", data.token);
      return;
    } catch (error) {
      console.log(error.message);
      dispatch(setTodosError(error.message));
    }
  }
);
