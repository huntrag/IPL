import React from "react";
import { Grid } from "@mui/material";
import MatchCard from "../../components/MatchCard/MatchCard";

import data from "../../../../scripts/schedule.json";
import FeaturedMatchCard from "../../components/FeaturedMatchCard/FeaturedMatchCard";

const Matches = () => {
  return (
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
  );
};

export default Matches;
