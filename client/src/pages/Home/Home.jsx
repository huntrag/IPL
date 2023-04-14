import React from "react";
import { FeaturedMatches, Rightbar } from "../../components";
import { Box, Divider, Stack } from "@mui/material";

const Home = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-around"
    >
      <Stack
        flex={1}
        sx={{ width: "100%" }}
        alignItems={"center"}
        justifyContent={"center"}
        direction="column"
      >
        <Box>
          <FeaturedMatches />
        </Box>
        <Divider />
        <Box>
          <FeaturedMatches />
        </Box>
      </Stack>

      <Rightbar />
    </Stack>
  );
};

export default Home;
