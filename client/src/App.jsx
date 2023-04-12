import React from "react";
import "./App.css";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { Home, About, Player, Players, Matches, Points, Stats } from "./pages";
import { Navbar, Sidebar } from "./components";

import { Box, Stack } from "@mui/material";

function App() {
  const Layout1 = () => {
    return (
      <Box className="App">
        <Navbar />
        <Stack direction="row" justifyContent="space-between">
          <Sidebar />
          <Box flex={8}>
            <Outlet />
          </Box>
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
          path: "/stats",
          element: <Stats />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
