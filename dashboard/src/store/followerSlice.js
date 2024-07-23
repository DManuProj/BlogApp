import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followersData: [],
  totalFollowers: 0,
  numOfPages: 0,
  currentPage: null,
};

const followerSlice = createSlice({
  name: "follower",
  initialState,
  reducers: {
    setFollowerData: (state, action) => {
      state.followersData = action.payload.data;
      state.totalFollowers = action.payload.total;
      state.numOfPages = action.payload.numOfPages;
      state.currentPage = action.payload.page;
    },
  },
});

export const { setFollowerData } = followerSlice.actions;
export default followerSlice.reducer;
