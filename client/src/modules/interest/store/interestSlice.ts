import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interests: [],
  status: "idle",
};
export const interestSlice = createSlice({
  name: "interest",
  initialState,
  reducers: {
    setInterests: (state, action) => {
      state.interests = action.payload;
    },
  },
});
export const { setInterests } = interestSlice.actions;
export const interestReducer = interestSlice.reducer;
