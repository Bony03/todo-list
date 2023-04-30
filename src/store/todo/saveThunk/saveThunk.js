import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setTodosError,
  setLoading,
  setTodosSuccess,
} from "../../system/system.slice";
import { setToken } from "../../user/user.slice";

export const saveTodos = createAsyncThunk(
  "todos/saveTodos",
  async function (todos, { dispatch }) {
    console.log("save");
    try {
      dispatch(setLoading(true));
      const response = await fetch("http://localhost:3001/todos/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ todos }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      dispatch(setLoading(false));
      dispatch(setTodosSuccess(data.message));
      dispatch(setToken(data.token));
      return;
    } catch (error) {
      console.log(error.message);
      dispatch(setTodosError(error.message));
    }
  }
);
