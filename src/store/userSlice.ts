import { getAuthenticationToken, loginUser } from "@/res/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any | null;
  loading: boolean;
  token: string | null;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  token: null,
  error: null,
};

// Async thunk for logging in the user
export const loginUserFromAPI = createAsyncThunk(
  "user/login-user",
  async (body: any, { rejectWithValue }) => {
    try {
      const response = await loginUser(body);
      return response;
    } catch (error: any) {
      console.error("Login Error:", error);
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Async thunk for getting user token
export const getUserToken = createAsyncThunk(
  "user/user-token",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await getAuthenticationToken(token);
      return response;
    } catch (error: any) {
      console.error("Token Error:", error);
      return rejectWithValue(error.message || "Failed to retrieve token");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserFromAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUserFromAPI.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.token = action.payload;
          state.error = null;
        }
      )
      .addCase(loginUserFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getUserToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserToken.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
