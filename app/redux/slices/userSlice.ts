import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
const initialState = {
  user: null as User | null,
  isAuthenticated: false,
};

export const initializeUser = createAsyncThunk(
  "user/initializeUser",
  async () => {
    try {
      const response = await fetch("/api/verify-token");
      const data = await response.json();
      return data.user;
    } catch (error) {
      return null;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
