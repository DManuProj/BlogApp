import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contentData: [],
  totalPosts: 0,
  numOfPages: 0,
  currentPage: null,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContentData: (state, action) => {
      state.contentData = action.payload.data;
      state.totalPosts = action.payload.totalPost;
      state.numOfPages = action.payload.numOfPage;
      state.currentPage = action.payload.page;
    },
  },
});

export const { setContentData } = contentSlice.actions;
export default contentSlice.reducer;
