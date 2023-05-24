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
    addLoaded: (state, action) => {
      const copyArray = JSON.parse(JSON.stringify(state));
      for (let index = 0; index < action.payload.length; index++) {
        copyArray.push(action.payload[index]);
      }
      const newArray = copyArray.reduce((acc, item) => {
        if (
          !acc.find((elem) => {
            return elem.id === item.id;
          })
        ) {
          acc.push(item);
        }
        return acc;
      }, []);
      state = newArray;
      return state;
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
  addLoaded,
  addCategory,
  setCategoryName,
} = todoSlice.actions;

export default todoSlice.reducer;
