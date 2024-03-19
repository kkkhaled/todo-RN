import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../auth/async-storage";
import { addTodoState } from "./addTodo.state";

interface TodoData {
  task: string;
  startedAt: Date;
  endedAt: Date;
}

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todoData: TodoData, { rejectWithValue }) => {
    try {
      console.log(todoData);

      const token = await getToken();
      const response = await axios.post(
        `https://todo-mobile-app.onrender.com/api/tasks`,
        todoData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Todo created");

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(error.response.data);
    }
  }
);

const createTodoSlice = createSlice({
  name: "createTodo",
  initialState: addTodoState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default createTodoSlice.reducer;
