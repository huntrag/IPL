import React from "react";
import { FeaturedMatches, Rightbar } from "../../components";
import { Box, Stack } from "@mui/material";

const Home = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <FeaturedMatches />
      <Rightbar />
    </Stack>
  );
};

export default Home;
