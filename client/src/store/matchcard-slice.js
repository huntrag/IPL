import { createSlice } from "@reduxjs/toolkit";

const matchcardSlice = createSlice({
  name: "matchcard",
  initialState: { matchcard: [] },
  reducers: {
    getmatchcard(state, action) {
      state.matchcard = action.payload;
    }
  },
});

export const matchcardActions = matchcardSlice.actions;

export default matchcardSlice;
