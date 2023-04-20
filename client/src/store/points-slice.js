import { createSlice } from "@reduxjs/toolkit";

const pointsSlice = createSlice({
  name: "points",
  initialState: { points: [] },
  reducers: {
    getPoints(state, action) {
      state.points = action.payload;
    },
  },
});

export const pointsActions = pointsSlice.actions;

export default pointsSlice;
