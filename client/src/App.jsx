import React from "react";
import "./App.css";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import {
  Home,
  About,
  Player,
  Players,
  Matches,
  Results,
  Points,
  Stats,
  UpcomingMatches,
  LiveMatch,
  Match,
} from "./pages";
import { Navbar, Sidebar, Main } from "./components";

import { Box, Stack, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
// import videoBg from "./assets/videoBg.mp4";

function App() {
  const Layout1 = () => {
    const open = useSelector((state) => state.ui.drawerIsVis);

    return (
      <Box className="App">
        <Navbar />
        <Stack direction="row" justifyContent="space-between">
          <Sidebar />
          <Main open={open}>
            {/* <video src={videoBg}></video> */}
            <Outlet />
          </Main>
        </Stack>
      </Box>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout1 />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/matches",
          element: <Matches />,
        },
        {
          path: "/player/:id",
          element: <Player />,
        },
        {
          path: "/players",
          element: <Players />,
        },
        {
          path: "/points",
          element: <Points />,
        },
        {
          path: "/results",
          element: <Results />,
        },
        {
          path: "/stats",
          element: <Stats />,
        },
        {
          path: "/upcoming-matches",
          element: <UpcomingMatches />,
        },
        {
          path: "/match/:id",
          element: <Match />,
        },
        {
          path: "/live-match/:id",
          element: <LiveMatch />,
        },
      ],
    },
  ]);

  return (
    // <ThemeProvider>
    <RouterProvider router={router} />
    // </ThemeProvider>
  );
}

export default App;
