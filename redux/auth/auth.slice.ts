import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { removeToken, saveToken } from "./async-storage";
import { authState } from "./authState";
import axios from "axios";

// Define async thunk for signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "https://todo-mobile-app.onrender.com/api/auth/register",
        userData
      );
      const data = response.data;

      if (response.status === 400) {
        console.log("signed up failed");
        return null;
      }
      console.log("signed up");

      await saveToken(data.token);

      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Define async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "https://todo-mobile-app.onrender.com/api/auth/login",
        userData
      );
      const data = response.data;
      console.log(data, response.status);

      if (response.status !== 200) {
        console.log("logged in failed");
        return null;
      }
      await saveToken(data.token);

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const logout = createAction("auth/logout");

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      if (action.payload === null) {
        state.error = "User registered before";
        state.loading = false;
        state.isAuthenticated = false;
      } else {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action?.error?.message
        ? action.error.message
        : "An error occurred.";
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload, "jjjjjjjjjjjjjjjjjjjjjjjjjjjj");

      if (action.payload === null) {
        console.log("--------------");
        state.error = "User not found";
        state.loading = false;
        state.isAuthenticated = false;
      } else {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action?.error?.message
        ? action.error.message
        : "An error occurred.";
    });
    builder.addCase(logout, (state) => {
      removeToken();
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
