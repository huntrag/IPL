import React from "react";
import { Grid, Stack, Paper } from "@mui/material";

import data from "../../../../scripts/results2023_temp.json";
import { FilterTeam, LiveCard } from "../../components";

const Results = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} spacing={5}>
      <FilterTeam />
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
              <Grid item sx={{ mt: 2, mb: 2 }} key={match.id}>
                <LiveCard match={match} />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Results;
