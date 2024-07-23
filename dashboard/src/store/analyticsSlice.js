import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  analyticsData: null,
};

const analyticSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setAnalyticsData: (state, action) => {
      state.analyticsData = action.payload;
    },
  },
});

export const { setAnalyticsData } = analyticSlice.actions;
export default analyticSlice.reducer;
