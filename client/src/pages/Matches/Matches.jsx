import React from "react";
import { Grid, Stack, Paper } from "@mui/material";
import MatchCard from "../../components/MatchCard/MatchCard";

import data from "../../../../scripts/schedule.json";

const Matches = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent={"flex-start"}
        flexWrap={"wrap"}
        component={"ul"}
        sx={{ listStyle: "none" }}
        flexGrow={1}
        width="83vw"
      >
        {data.map((match, index) => {
          return (
            <Grid item sx={{ mt: 2, mb: 2 }} key={match.no}>
              <MatchCard match={match} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default Matches;
