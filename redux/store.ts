import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import getUserTodosReducer from "./todos/get-todo/getTodo.slice";
import createTodoReducer from "./todos/add-todo/addTodo.slice";
import editTodoReducer from "./todos/update-todo/editTodo.slice";
import deleteTodoReducer from "./todos/delete-todo/deleteTodo.slices";
const store = configureStore({
  reducer: {
    auth: authReducer,
    getTodos: getUserTodosReducer,
    addtodo: createTodoReducer,
    edittodo: editTodoReducer,
    deleteTodo: deleteTodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
