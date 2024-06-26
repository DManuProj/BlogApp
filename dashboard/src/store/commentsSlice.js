import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openComment: false,
  commentId: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setOpenComments: (state, action) => {
      state.openComment = action.payload;
    },
    setCommentId: (state, action) => {
      state.commentId = action.payload.id;
    },
  },
});

export const { setCommentId, setOpenComments } = commentsSlice.actions;
export default commentsSlice.reducer;
