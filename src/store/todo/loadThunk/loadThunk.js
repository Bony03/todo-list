import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTodosError, setTodosSuccess } from "../../system/system.slice";
import { addLoadedTodos } from "../todo.slice";
import { setToken } from "../../user/user.slice";
export const loadTodos = createAsyncThunk(
  "todos/loadTodos",
  async function (_, { dispatch }) {
    try {
      const response = await fetch("http://localhost:3001/todos/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      dispatch(addLoadedTodos(data.todos));
      dispatch(setTodosSuccess(data.message));
      dispatch(setToken(data.token));
      return;
    } catch (error) {
      dispatch(setTodosError(error.message));
    }
  }
);
