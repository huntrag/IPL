import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { loginIsVis: false, drawerIsVis: false, isLoading: false },
  reducers: {
    showLogin(state) {
      state.loginIsVis = true;
    },
    hideLogin(state) {
      state.loginIsVis = false;
    },
    showDrawer(state) {
      state.drawerIsVis = true;
    },
    hideDrawer(state) {
      state.drawerIsVis = false;
    },
    showLoading(state) {
      state.isLoading = true;
    },
    hideLoading(state) {
      state.isLoading = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
