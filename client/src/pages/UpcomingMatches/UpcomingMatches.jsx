import React from "react";
import { Grid, Stack } from "@mui/material";

import data from "../../../../scripts/schedule.json";
import { UpcomingMatchCard } from "../../components";

const UpcomingMatches = () => {
  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Grid
        container
        rowSpacing={3}
        alignSelf={"center"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {data.map((match, index) => {
          return (
            <Grid item sx={{ m: 2 }}>
              <UpcomingMatchCard match={match} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default UpcomingMatches;
