import { createSlice } from "@reduxjs/toolkit";

export const likeSlice = createSlice({
  name: "like",
  initialState: {
    likeCount: 0,
  },
  reducers: {
    updateLikeCount: (state, action) => {
      state.likeCount = action.payload;
    },
  },
});

export const { updateLikeCount } = likeSlice.actions;

export default likeSlice.reducer;
