import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "like",
  initialState: {
    likeCount: 0,
    likedItems: {},
  },
  reducers: {
    updateLikeCount: (state, action) => {
      state.likeCount = action.payload + state.likeCount;
    },
    updateLikeItem: (state, action) => {
      const { itemId, isLiked } = action.payload;
      state.likedItems[itemId] = isLiked;
    },
  },
});

export const { updateLikeCount, updateLikeItem } = likeSlice.actions;

export default likeSlice.reducer;
