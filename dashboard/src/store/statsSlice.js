import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statsData: null,
};

const statSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setStatsData: (state, action) => {
      state.statsData = action.payload;
    },
  },
});

export const { setStatsData } = statSlice.actions;
export default statSlice.reducer;
