import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
