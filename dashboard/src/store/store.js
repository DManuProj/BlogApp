import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import commentsSlice from "./commentsSlice";
import statsSlice from "./statsSlice";
import analyticsSlice from "./analyticsSlice";
import contentSlices from "./contentSlices";
import followerSlice from "./followerSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    comments: commentsSlice,
    stats: statsSlice,
    analytics: analyticsSlice,
    contents: contentSlices,
    followers: followerSlice,
  },
});
