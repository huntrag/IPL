import React from "react";
import { Grid } from "@mui/material";
import MatchCard from "../../components/MatchCard/MatchCard";

import data from "../../../../scripts/schedule.json";

const Matches = () => {
  return (
    <Grid container rowSpacing={3}>
      {data.map((match, index) => {
        return (
          <Grid item sx={{ m: 2 }}>
            <MatchCard match={match} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Matches;
