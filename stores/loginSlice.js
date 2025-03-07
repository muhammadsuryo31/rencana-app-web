import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: { email: '' },
  reducers: {
    login: (state, action) => {
      state.email = action.payload;
    },
    logout: (state) => {
      state.email = '';
    },
  }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
