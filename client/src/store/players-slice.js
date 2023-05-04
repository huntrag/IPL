import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: { players: [] },
  reducers: {
    getplayers(state, action) {
      state.players = action.payload;
    }
  },
});

export const playersActions = playersSlice.actions;

export default playersSlice;
