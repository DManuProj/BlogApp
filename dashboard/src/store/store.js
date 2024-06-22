import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import commentsSlice from "./commentsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    comments: commentsSlice,
  },
});
