import { configureStore } from "@reduxjs/toolkit";
import pointsSlice from "./points-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, points: pointsSlice.reducer },
});

export default store;
