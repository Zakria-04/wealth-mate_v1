import { loginUser } from "@/res/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loginUserFromAPI = createAsyncThunk("user/login-user", (body) => {
  try {
    return loginUser(body as any);
  } catch (error) {
    console.error("error", error);
  }
});

const initialState = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserFromAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUserFromAPI.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(loginUserFromAPI.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
