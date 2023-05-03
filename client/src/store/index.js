import { configureStore } from "@reduxjs/toolkit";
import liveteamSlice from "./liveteam-slice";
import pointsSlice from "./points-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    points: pointsSlice.reducer,
    liveteam: liveteamSlice.reducer,
  },
});

export default store;
