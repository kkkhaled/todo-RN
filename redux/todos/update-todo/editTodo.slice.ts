import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../auth/async-storage";
import { editTodoState } from "./editTodo.state";

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (
    data: { task: string; startedAt: Date; endedAt: Date; id: number },
    { rejectWithValue }
  ) => {
    try {
      const token = await getToken();
      const response = await axios.put(
        `https://todo-mobile-app.onrender.com/api/tasks/edit/${data.id}`,
        { task: data.task, startedAt: data.startedAt, endedAt: data.endedAt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("todo updated");

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(error.response.data);
    }
  }
);

const updateTodoSlice = createSlice({
  name: "updateTodo",
  initialState: editTodoState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default updateTodoSlice.reducer;
