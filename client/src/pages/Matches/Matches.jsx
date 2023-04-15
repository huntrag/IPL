import React from "react";
import { Grid, Stack } from "@mui/material";
import MatchCard from "../../components/MatchCard/MatchCard";

import data from "../../../../scripts/schedule.json";
import FeaturedMatchCard from "../../components/FeaturedMatchCard/FeaturedMatchCard";

const Matches = () => {
  return (
    <Stack>
      <Grid
        container
        rowSpacing={3}
        alignItems="center"
        justifyContent={"flex-start"}
      >
        {data.map((match, index) => {
          return (
            <Grid item sx={{ m: 2 }}>
              <FeaturedMatchCard match={match} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default Matches;
