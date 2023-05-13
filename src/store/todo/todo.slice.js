import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const item = state.find(
        (categoryItem) => categoryItem.id === action.payload.categoryId
      );
      item.todos.unshift({
        id: action.payload.id,
        name: action.payload.name,
        date: action.payload.date,
        time: action.payload.time,
        category: action.payload.categoryName,
        categoryId: action.payload.categoryId,
        completed: false,
        edited: null,
      });
    },
    deleteTodo: (state, action) => {
      const item = state.find(
        (categoryItem) => categoryItem.id === action.payload.categoryId
      );
      item.todos = item.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodo: (state, action) => {
      const item = state.find(
        (categoryItem) => categoryItem.id === action.payload.categoryId
      );
      const elem = item.todos.find((todo) => todo.id === action.payload.id);
      elem.completed = !elem.completed;
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
    addCategory: (state) => {
      state.push({ name: "My category", id: Date.now(), todos: [] });
    },
    setCategoryName: (state, action) => {
      const item = state.find(
        (categoryItem) => categoryItem.id === action.payload.id
      );
      item.name = action.payload.name;
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
  addCategory,
  setCategoryName,
} = todoSlice.actions;

export default todoSlice.reducer;
