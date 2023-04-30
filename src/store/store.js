import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo/todo.slice";
import userSlice from "./user/user.slice";
import systemSlice from "./system/system.slice";
import { listenerMiddleware } from "./listernerMiddlewere/listernerMiddlewere";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    user: userSlice,
    system: systemSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["meta.arg", "payload"],
        ignoredPaths: ["user.file"],
      },
    }).prepend(listenerMiddleware.middleware),
});
