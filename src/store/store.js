import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
import likeSlice from "./likeSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
    like: likeSlice,
  },
});
