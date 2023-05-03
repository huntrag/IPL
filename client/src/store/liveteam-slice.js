import { createSlice } from "@reduxjs/toolkit";

const liveteamSlice = createSlice({
  name: "liveteam",
  initialState: { team1: null, team2: null, liveteam: [] },
  reducers: {
    getliveteam(state, action) {
      state.liveteam = action.payload;
    },
    setTeam(state, action) {
      state.team1 = action.payload.team1;
      state.team2 = action.payload.team2;
    },
  },
});

export const liveteamActions = liveteamSlice.actions;

export default liveteamSlice;
