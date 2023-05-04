import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    header: null,
    col: null,
    url: null,
    year: null,
    type: 1,
    stats: [],
  },
  reducers: {
    getstats(state, action) {
      state.stats = action.payload;
    },
    setheader(state, action) {
      state.header = action.payload;
    },
    setcol(state, action) {
      state.col = action.payload;
    },
    setyear(state, action) {
      state.year = action.payload;
    },
    seturl(state, action) {
      state.url = action.payload;
    },
    settype(state, action) {
      state.type = action.payload;
    },
  },
});

export const statsActions = statsSlice.actions;

export default statsSlice;