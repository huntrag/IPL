import React from "react";
import "./App.css";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { Home, About, Player, Players, Matches, Points, Stats } from "./pages";
import { Layout } from "./components";

function App() {
  const Navbar = () => {
    return (
      <div className="App">
        <Layout />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
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
