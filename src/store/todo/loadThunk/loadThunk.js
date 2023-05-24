import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setLoading,
  setTodosError,
  setTodosSuccess,
  clearAllNotifications,
} from "../../system/system.slice";
import { addLoaded } from "../todo.slice";
import { logOut } from "../../user/user.slice";
export const loadTodos = createAsyncThunk(
  "todos/loadTodos",
  async function (_, { dispatch }) {
    try {
      dispatch(clearAllNotifications());
      dispatch(setLoading(true));
      const response = await fetch("http://192.168.31.249:3001/todos/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
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
      dispatch(addLoaded(data.todos));
      dispatch(setTodosSuccess(data.message));
      localStorage.setItem("token", data.token);
      return;
    } catch (error) {
      console.log(error.message);
      dispatch(setTodosError(error.message));
    }
  }
);
