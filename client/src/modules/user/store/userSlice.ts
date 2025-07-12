import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
