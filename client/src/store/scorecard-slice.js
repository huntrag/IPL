import { createSlice } from "@reduxjs/toolkit";

const scorecardSlice = createSlice({
  name: "scorecard",
  initialState: { scorecard: [] },
  reducers: {
    getscorecard(state, action) {
      state.scorecard = action.payload;
    }
  },
});

export const scorecardActions = scorecardSlice.actions;

export default scorecardSlice;
