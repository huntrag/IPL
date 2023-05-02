import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store/index";

import theme from "./theme";
import { TheaterComedy } from "@mui/icons-material";
import { ScopedCssBaseline, ThemeProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
    <ScopedCssBaseline>
      <Provider store={store}>
        <App />
      </Provider>
    </ScopedCssBaseline>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
