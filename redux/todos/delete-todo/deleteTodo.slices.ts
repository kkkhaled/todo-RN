import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../auth/async-storage";
import { deleteTodoState } from "./deleteTodo.state";

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number, { rejectWithValue }) => {
    // Ensure id parameter is specified
    try {
      const token = await getToken();
      await axios.delete(
        `https://todo-mobile-app.onrender.com/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("deleted");
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(error.response.data);
    }
  }
);

const deleteTodoSlice = createSlice({
  name: "deleteTodo",
  initialState: deleteTodoState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default deleteTodoSlice.reducer;
