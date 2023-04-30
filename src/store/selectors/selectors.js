export const loading = (state) => state.system.loading;
export const auth = (state) => state.system.isAuth;
export const sign = (state) => state.system.showSign;
export const success = (state) => state.system.success;
export const authEr = (state) => state.system.authError;
export const todosEr = (state) => state.system.todosError;
export const profileEr = (state) => state.system.profileError;
export const authSc = (state) => state.system.authSuccess;
export const todosSc = (state) => state.system.todosSuccess;
export const profileSc = (state) => state.system.profileSuccess;
export const system = (state) => state.system;
export const user = (state) => state.user;
export const file = (state) => state.user.file;
export const todos = (state) => state.todo.todos;
export const stats = (state) => state.todo.statistics;