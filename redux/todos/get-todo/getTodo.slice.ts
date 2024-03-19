import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../auth/async-storage";
import { todoState } from "./getTodo.state";

export const getUserTodos = createAsyncThunk(
  "todos/getUserTodos",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `https://todo-mobile-app.onrender.com/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Tasks fetched");

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getUserTodosSlice = createSlice({
  name: "getUserTodos",
  initialState: todoState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos;
      })
      .addCase(getUserTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default getUserTodosSlice.reducer;
