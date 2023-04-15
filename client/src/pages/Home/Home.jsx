import React from "react";
import { FeaturedMatches, FeaturedPlayers, Rightbar } from "../../components";
import { Box, Divider, Stack, Typography, Paper } from "@mui/material";

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
        <Paper>
          <Stack direction={"column"} sx={{ m: 3 }}>
            <Box sx={{ m: 3 }}>
              <Typography variant="h4" gutterBottom>
                Featured Matches
              </Typography>
            </Box>
            <FeaturedMatches />
          </Stack>
        </Paper>
        <Divider sx={{ width: "80%", height: 2, m: 4 }} />
        <Paper>
          <Stack direction={"column"} sx={{ m: 3 }}>
            <Box sx={{ m: 3 }}>
              <Typography variant="h4">Featured Players</Typography>
            </Box>
            <FeaturedPlayers />
          </Stack>
        </Paper>
      </Stack>

      <Rightbar />
    </Stack>
  );
};

export default Home;
