import { configureStore } from "@reduxjs/toolkit";
import liveteamSlice from "./liveteam-slice";
import pointsSlice from "./points-slice";
import uiSlice from "./ui-slice";
import matchcardSlice from "./matchcard-slice";
import scorecardSlice from "./scorecard-slice";
import playersSlice from "./players-slice";
import statsSlice from "./stats-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    points: pointsSlice.reducer,
    liveteam: liveteamSlice.reducer,
    matchcard:matchcardSlice.reducer,
    scorecard:scorecardSlice.reducer,
    players:playersSlice.reducer,
    stats:statsSlice.reducer
  },
});

export default store;
