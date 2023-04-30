import { createSlice } from "@reduxjs/toolkit";
import { saveTodos } from "./saveThunk/saveThunk";
import { listenerMiddleware } from "../listernerMiddlewere/listernerMiddlewere";
import { checkToken } from "../user/checkTokenThunk/checkTokenThunk";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const elem = {
        ...state.todos.find((todo) => todo.id === action.payload),
      };
      elem.completed = !elem.completed;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      elem.completed ? state.todos.push(elem) : state.todos.unshift(elem);
    },
    editTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    addEditedTodo: (state, action) => {
      state.todos.unshift(action.payload);
      state.todos[0].edit = Date.now();
    },
    addLoadedTodos: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.todos.push(action.payload[i]);
      }
      const newArray = state.todos.reduce((prev, curr) => {
        if (!prev.find((v) => v.id === curr.id)) {
          prev.push(curr);
        }
        return prev;
      }, []);
      state.todos = newArray;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  addEditedTodo,
  addLoadedTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
